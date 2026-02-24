using System.Net.Http.Headers;

namespace LogiLearn.Infrastructure.GithubServices;

public class GithubClientBuilder : IGithubClientBuilder
{
    public HttpClient GetClient(string token)
    {
        var client = new HttpClient {
            BaseAddress = new Uri("https://api.github.com"),
        };

        client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/vnd.github+json")
        );

        client.DefaultRequestHeaders.UserAgent.Add(
            new ProductInfoHeaderValue("LogiLearn", "1.0")
        );

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        
        return client;
    }
}