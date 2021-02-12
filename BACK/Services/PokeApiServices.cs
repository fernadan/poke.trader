using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Headers;

namespace API.Services
{
    public class PokeApiServices
    {
        private readonly HttpClient client;

        public PokeApiServices()
        {
            client = new HttpClient();
        }

        public async Task<string> callExtraApiService(string URL)
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");

            var stringTask = client.GetStringAsync(URL);

            return await stringTask;
        }
    }
}
