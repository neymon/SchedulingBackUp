using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using Scheduling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Services
{
    public class DataBaseService
    {
        MongoClient Client;
        IMongoDatabase database;
        IMongoCollection<UserModel> Users;
        public DataBaseService(IConfiguration configuration)
        {
            Client = new MongoClient(configuration.GetSection("ConnectionDB").Value);
            database = Client.GetDatabase("Scheduling2");
            Users = database.GetCollection<UserModel>("Users");
        }

        public async Task<List<UserModel>> GetUsers()
        {
            return await Users.Find<UserModel>(user => true).ToListAsync();
        }

        public async Task<UserModel> GetUser(string email)
        {
            return await Users.Find<UserModel>(user => user.Email == email).FirstOrDefaultAsync();
        }

        public async Task AddUser(UserModel user)
        {
            await Users.InsertOneAsync(user);
        }

        public async Task<UserModel> UpdateUser(UserModel user)
        {
            await Users.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(user.Id)), user);
            return await Users.Find(new BsonDocument("_id", new ObjectId(user.Id))).FirstOrDefaultAsync();
        }

        public async Task RemoveUser(string id)
        {
            await Users.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }

    }
}

