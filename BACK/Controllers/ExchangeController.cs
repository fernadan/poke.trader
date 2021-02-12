using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Services;
using API.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExchangeController : Controller
    {
        private readonly UserServices _userService;
        private readonly HistoricServices _hisotircService;

        public ExchangeController(UserServices userService, HistoricServices hisotircService)
        {
            _userService = userService;
            _hisotircService = hisotircService;
        }

        //Trocar
        [HttpPost]
        public ActionResult<bool> Post([FromBody] ExchangePokes _exchangePokes)
        {
            User start = _userService.Get(_exchangePokes.userIdStart);
            User end = _userService.Get(_exchangePokes.userIdEnd);

            if (start == null || end == null)
                return BadRequest();

            int sumBESent = _exchangePokes.pokemonsSent.Sum(poke => int.Parse(poke.Base_experience));
            int sumBERec = _exchangePokes.pokemonsRec.Sum(poke => int.Parse(poke.Base_experience));

            if ((sumBESent < sumBERec - 5 || sumBESent > sumBERec + 5) && (sumBERec < sumBESent - 5 || sumBERec > sumBESent + 5))
                return BadRequest();

            foreach (Pokemon poke in _exchangePokes.pokemonsSent)
                start.Pokemons.Remove(start.Pokemons.Find(f => f.Id.Equals(poke.Id)));

            foreach (Pokemon poke in _exchangePokes.pokemonsRec)
                end.Pokemons.Remove(end.Pokemons.Find(f => f.Id.Equals(poke.Id)));            

            start.Pokemons.AddRange(_exchangePokes.pokemonsRec);
            _userService.Update(start.Id, start);

            end.Pokemons.AddRange(_exchangePokes.pokemonsSent);
            _userService.Update(end.Id, end);

            Historic _hist = new Historic() {
                UserStartPointId = start.Id,
                UserStartPointName = start.Nome,
                PokemonsSent = _exchangePokes.pokemonsSent,
                UserEndPointId = end.Id,
                UserEndPointName = end.Nome,
                PokemonsRec = _exchangePokes.pokemonsRec
            };

            _hisotircService.Create(_hist);

            return Accepted();
        }
    }
}
