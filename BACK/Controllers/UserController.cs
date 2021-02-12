using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Services;
using API.Models;
using Newtonsoft.Json;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserServices _userService;
        private readonly PokeApiServices _pokeApiService;

        public UserController(UserServices userService, PokeApiServices pokeApiService)
        {
            _userService = userService;
            _pokeApiService = pokeApiService;
        }

        [HttpGet("listaselect/{id:length(24)}")]
        public async Task<ActionResult<List<User>>> GetExcCurrent(string Id)
        {
            List<User> user = _userService.GetExcCurrent(Id);

            if (user == null)
            {
                return BadRequest();
            }

            return user;
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            var user = _userService.Get(id);

            foreach (Pokemon poke in user.Pokemons)
            {
                try
                {
                    string _reponse = await _pokeApiService.callExtraApiService($"https://pokeapi.co/api/v2/pokemon/{poke.Id}");

                    poke.Base_experience = JsonConvert.DeserializeObject<Pokemon>(_reponse).Base_experience;
                }
                catch (Exception)
                {
                    poke.Base_experience = "1";
                }
            }

            if (user == null)
            {
                return BadRequest();
            }

            return user;
        }

        [HttpPost]
        public ActionResult<User> Post([FromBody] Auth user)
        {
            var userAuth = _userService.GetAuthentication(user.user, user.pass);

            if (userAuth == null)
            {
                return Forbid();
            }

            userAuth.Token = "Token";

            return userAuth;
        }
    }
}
