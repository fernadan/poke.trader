using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using API.Models;
using API.Components;

namespace API.Services
{
    public class UserServices
    {
        private readonly IMongoCollection<User> _users;

        public UserServices(IPokesDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>("Pokes");
        }

        public List<User> Get() =>
            _users.Find(user => true).ToList();

        public List<User> GetExcCurrent(string id) =>
            _users.Find(user => user.Id != id).ToList();

        public User Get(string id) =>
            _users.Find<User>(user => user.Id == id).FirstOrDefault();

        public User GetAuthentication(string user, string pass)
        {
            string passHashed = Util.GerarHash(pass);
            return _users.Find<User>(userDB => userDB.Usuario.Equals(user) && userDB.Senha.Equals(passHashed)).FirstOrDefault();
        }

        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }

        public void Update(string id, User userIn) =>
            _users.ReplaceOne(user => user.Id == id, userIn);

        public void Remove(User userIn) =>
            _users.DeleteOne(user => user.Id == userIn.Id);

        public void Remove(string id) =>
            _users.DeleteOne(user => user.Id == id);
    }
}
