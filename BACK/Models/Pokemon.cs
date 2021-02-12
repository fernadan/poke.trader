using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models
{
    [BsonNoId]
    public class Pokemon
    {
        [BsonElement("Id")]
        public string Id { get; set; }

        public string Nome { get; set; }

        public string Base_experience { get; set; }

        public string Foto { get; set; }
    }
}
