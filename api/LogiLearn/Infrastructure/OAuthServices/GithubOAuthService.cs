namespace LogiLearn.Infrastructure.OAuthServices;

public class GithubOAuthService(
    IConfiguration configuration, 
    ILogger<GithubOAuthService> logger) : IOAuthService
{
    public async Task<string> GetToken(string code, params string[] parameters)
    {
        var client_id = configuration["GITHUB_OAUTH_CLIENTID"];
        var client_secret = configuration["GITHUB_OAUTH_CLIENTSECRET"];

        if (client_id is null || client_secret is null)
        {
            if (logger.IsEnabled(LogLevel.Critical))
                logger.LogCritical("missing GITHUB_OAUTH_CLIENTID or GITHUB_OAUTH_CLIENTSECRET on enviroment.");
            throw new Exception("Missing configuration.");
        }

        var client = new HttpClient();

        var payload = new {
            client_id,
            client_secret,
            code
        };

        var response = await client.PostAsync(
            "https://github.com/login/oauth/access_token", 
            JsonContent.Create(payload)
        );

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            if (logger.IsEnabled(LogLevel.Error))
                logger.LogError("Github OAuth return with status {error}.", error);
            throw new Exception("OAuth Github API failed.");    
        }

        var tokenData = await response.Content.ReadAsStringAsync();

        var accessToken = tokenData
            .Split([ '=', '&' ])
            .SkipWhile(value => value is not "access_token")
            .Skip(1)
            .FirstOrDefault();
        
        if (accessToken is null)
        {
            if (logger.IsEnabled(LogLevel.Error))
                logger.LogError("Invalid github token format: {error}.", tokenData);
            throw new Exception("OAuth Github API failed.");    
        }

        return accessToken;
    }
}