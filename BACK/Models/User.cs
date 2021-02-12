using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [DataMember]
        public string Nome { get; set; }

        [DataMember]
        public List<Pokemon> Pokemons { get; set; }

        [DataMember]
        public string Usuario { get; set; }

        [DataMember]
        public string Senha { get; set; }

        public string Token { get; set; }
    }
}
