using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using API.Models;

namespace API.Services
{
    public class HistoricServices
    {
        private readonly IMongoCollection<Historic> _historics;

        public HistoricServices(IPokesDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _historics = database.GetCollection<Historic>("Historic");
        }

        public List<Historic> Get() =>
            _historics.Find(historic => true).ToList();

        public Historic Get(string id) =>
            _historics.Find<Historic>(historic => historic.Id == id).FirstOrDefault();

        public List<Historic> GetByUser(string idUser) =>
            _historics.Find<Historic>(historic => historic.UserStartPointId == idUser || historic.UserEndPointId == idUser).ToList();

        public Historic Create(Historic historic)
        {
            _historics.InsertOne(historic);
            return historic;
        }

        public void Update(string id, Historic historicIn) =>
            _historics.ReplaceOne(historic => historic.Id == id, historicIn);

        public void Remove(Historic historicIn) =>
            _historics.DeleteOne(historic => historic.Id == historicIn.Id);

        public void Remove(string id) =>
            _historics.DeleteOne(historic => historic.Id == id);
    }
}
