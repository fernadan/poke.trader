using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class ExchangePokes
    {
        public string userIdStart { get; set; }

        public List<Pokemon> pokemonsSent { get; set; }

        public string userIdEnd { get; set; }

        public List<Pokemon> pokemonsRec { get; set; }
    }
}
