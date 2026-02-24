using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace LogiLearn.Endpoints.V1.Auth;

using Infrastructure.StateManagerServices;

public static class GithubOAuthEndpoints
{
    sealed class GithubOAuthEndpoint { }

    public static RouteGroupBuilder MapGithubOAuthEndpoints(this RouteGroupBuilder route)
    {
        const string callbackUrl = "/auth/callback";

        route.MapGet("/auth", (HttpResponse response, 
            [FromServices]IConfiguration configuration,
            [FromServices]IStateManagerService stateManager) =>
        {
            var clientId = configuration["GITHUB_OAUTH_CLIENTID"];
            var scopes = configuration["GITHUB_OAUTH_SCOPES"];
            var backurl = configuration["BACKEND_URL"]?.TrimEnd('/');
            var state = stateManager.GenNewState();

            Console.WriteLine(state);

            var url = new StringBuilder("https://github.com/login/oauth/authorize");
            url.Append($"?client_id={clientId}");
            url.Append($"&redirect_uri={backurl}/api/v1{callbackUrl}");
            if (scopes is not "none")
                url.Append($"&scopes={scopes}");
            url.Append($"&state={state}");

            response.Redirect(url.ToString());
        });

        route.MapGet(callbackUrl, (string? code, string? state,
            [FromServices]ILogger<GithubOAuthEndpoint> logger,
            [FromServices]IStateManagerService stateManager) =>
        {
            if (!stateManager.Exists(state))
            {
                logger.LogWarning("Invalid state on Github OAuth callback. Low state duration or XSRF attempt.");
                return Results.BadRequest();
            }

            if (code is null)
            {
                logger.LogWarning("Invalid code on Github OAuth callback. Possible XSRF attempt.");
                return Results.BadRequest();
            }

            Console.WriteLine(code);
            return Results.Ok();
        });

        return route;
    }
}