using LogiLearn.Contracts.V1;
using LogiLearn.Infrastructure.GithubServices;
using Microsoft.AspNetCore.Mvc;

namespace LogiLearn.Endpoints.V1.User;

public static class GithubUserInfoEndpoints
{
    sealed class GithubOAuthEndpoint { }

    public static RouteGroupBuilder MapGithubUserInfoEndpoints(this RouteGroupBuilder route)
    {
        route.MapGet("/user", async (HttpContext request, [FromServices]IGithubClientBuilder builder) =>
        {
            var token = request.Request.Cookies
                .FirstOrDefault(c => c.Key == "session").Value;
            if (token is null or "")
                return Results.Unauthorized();
            
            var client = builder.GetClient(token);

            var response = await client.GetAsync("/user");
            
            var content = await response.Content.ReadFromJsonAsync<GithubUserData>();
            return Results.Ok(content);
        });

        return route;
    }
}