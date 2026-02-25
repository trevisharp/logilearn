using LogiLearn.Endpoints.Attributes;

namespace LogiLearn.Endpoints.V1.Gists;

public static class GithubGistsEndpoints
{
    public static IEndpointRouteBuilder MapGithubGistsEndpoints(this IEndpointRouteBuilder route)
    {
        route.MapGet("/gists", () =>
        {
            return "batata";
        }).WithMetadata(new RequireCSRFTokenAttribute());

        return route;
    }
}