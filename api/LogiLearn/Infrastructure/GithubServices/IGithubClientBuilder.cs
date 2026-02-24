namespace LogiLearn.Infrastructure.GithubServices;

public interface IGithubClientBuilder
{
    HttpClient GetClient(string token);
}