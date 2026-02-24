namespace LogiLearn.Infrastructure.OAuthServices;

public interface IOAuthService
{
    Task<string> GetToken(string code, params string[] parameters);
}