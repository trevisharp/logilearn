using Microsoft.AspNetCore.Mvc;

namespace LogiLearn.Endpoints.V1.Gists;

using Contracts.V1;
using Domain;
using Endpoints.Attributes;
using Infrastructure.GithubServices;

public static class GithubGistsEndpoints
{
    public static IEndpointRouteBuilder MapGithubGistsEndpoints(this IEndpointRouteBuilder route)
    {
        route.MapGet("/gists", async (
            HttpContext context,
            [FromServices]IGithubClientBuilder builder,
            int page = 1) =>
        {
            var token = context.Request.Cookies["session"];
            if (token is null)
                return Results.Unauthorized();
            
            var client = builder.GetClient(token);
            
            var response = await client.GetAsync($"/gists?per_page=12&page={page}");

            if (!response.IsSuccessStatusCode)
                return Results.StatusCode(502);
            
            var json = await response.Content.ReadFromJsonAsync<GithubGist[]>();

            var circs = 
                from item in json
                where CircuitFile.ValidateFiles([ ..item.Files.Keys ])
                select item;
            
            return Results.Ok(circs);
        }).WithMetadata(new RequireCSRFTokenAttribute());

        route.Map("/gists/{id}", (string id) =>
        {
            
        });

        route.MapPost("/gists", () =>
        {
            
        }).WithMetadata(new RequireCSRFTokenAttribute());

        route.MapPatch("/gists", () =>
        {
            
        }).WithMetadata(new RequireCSRFTokenAttribute());

        return route;
    }
}