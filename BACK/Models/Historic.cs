using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models
{
    public class Historic
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string UserStartPointId { get; set; }

        public string UserStartPointName { get; set; }

        public List<Pokemon> PokemonsSent { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string UserEndPointId { get; set; }

        public string UserEndPointName { get; set; }

        public List<Pokemon> PokemonsRec { get; set; }
    }
}
