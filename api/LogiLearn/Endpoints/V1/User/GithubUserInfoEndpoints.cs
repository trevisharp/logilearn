using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace LogiLearn.Endpoints.V1.User;

using Contracts.V1;
using Infrastructure.GithubServices;

public static class GithubUserInfoEndpoints
{
    sealed class GithubOAuthEndpoint { }

    public static IEndpointRouteBuilder MapGithubUserInfoEndpoints(this IEndpointRouteBuilder route)
    {
        route.MapGet("/user", async (
            HttpContext request, 
            IMemoryCache cache,
            [FromServices]IGithubClientBuilder builder) =>
        {
            if (!request.Request.Cookies.TryGetValue("session", out var token) || string.IsNullOrEmpty(token))
                return Results.Unauthorized();

            var cacheKey = $"{SHA256.HashData(Encoding.UTF8.GetBytes(token))}_user";
            var content = await cache.GetOrCreateAsync(cacheKey, async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5);

                var client = builder.GetClient(token);
                var response = await client.GetAsync("/user");
                var content = await response.Content.ReadFromJsonAsync<GithubUserData>();

                return content;
            });

            return Results.Ok(content);
        });

        return route;
    }
}