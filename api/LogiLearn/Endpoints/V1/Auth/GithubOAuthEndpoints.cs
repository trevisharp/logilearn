using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace LogiLearn.Endpoints.V1.Auth;

using Infrastructure.StateManagerServices;
using LogiLearn.Infrastructure.OAuthServices;

public static class GithubOAuthEndpoints
{
    sealed class GithubOAuthEndpoint { }

    public static RouteGroupBuilder MapGithubOAuthEndpoints(this RouteGroupBuilder route)
    {
        const string callbackUrl = "/auth/callback";

        route.MapGet("/auth", (HttpResponse response, 
            [FromServices]ILogger<GithubOAuthEndpoint> logger,
            [FromServices]IConfiguration configuration,
            [FromServices]IStateManagerService stateManager) =>
        {
            var clientId = configuration["GITHUB_OAUTH_CLIENTID"];
            var scopes = configuration["GITHUB_OAUTH_SCOPES"] ?? "none";
            var backurl = configuration["BACKEND_URL"]?.TrimEnd('/');
            var state = stateManager.GenNewState();

            if (clientId is null || backurl is null)
            {
                if (logger.IsEnabled(LogLevel.Critical))
                    logger.LogCritical("Missing GITHUB_OAUTH_CLIENTID or BACKEND_URL on enviroment.");
                return Results.BadRequest();
            }

            var url = new StringBuilder("https://github.com/login/oauth/authorize");
            url.Append($"?client_id={clientId}");
            url.Append($"&redirect_uri={backurl}/api/v1{callbackUrl}");
            if (scopes is not "none")
                url.Append($"&scopes={scopes}");
            url.Append($"&state={state}");

            return Results.Redirect(url.ToString());
        });

        route.MapGet(callbackUrl, async (string? code, string? state,
            [FromServices]ILogger<GithubOAuthEndpoint> logger,
            [FromServices]IConfiguration configuration,
            [FromServices]IOAuthService oauth,
            [FromServices]IStateManagerService stateManager,
            HttpResponse response) =>
        {
            if (!stateManager.Exists(state))
            {
                if (logger.IsEnabled(LogLevel.Warning))
                    logger.LogWarning("Invalid state on Github OAuth callback. Low state duration or XSRF attempt.");
                return Results.BadRequest();
            }

            if (code is null)
            {
                if (logger.IsEnabled(LogLevel.Warning))
                    logger.LogWarning("Invalid code on Github OAuth callback. Possible XSRF attempt.");
                return Results.BadRequest();
            }
            
            var fronturl = configuration["FRONTEND_URL"]?.TrimEnd('/');

            if (fronturl is null)
            {
                if (logger.IsEnabled(LogLevel.Critical))
                    logger.LogCritical("Missing FRONTEND_URL on enviroment.");
                return Results.BadRequest();
            }

            var userToken = await oauth.GetToken(code);

            response.Cookies.Append("session", userToken, new CookieOptions
            {
                Secure = true,
                HttpOnly = true,
                SameSite = SameSiteMode.Strict
            });

            return Results.Redirect($"{fronturl}/profile");
        });

        return route;
    }
}