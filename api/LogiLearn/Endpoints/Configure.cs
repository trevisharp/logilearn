using LogiLearn.Endpoints.V1;
using LogiLearn.Endpoints.V1.Auth;
using LogiLearn.Endpoints.V1.Gists;
using LogiLearn.Endpoints.V1.User;

namespace LogiLearn.Endpoints;

public static class Configure
{
    public static IEndpointRouteBuilder MapV1Endpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1");

        group.MapFeatureFlagEndpoints();
        group.MapAIGeneratorEndpoints();
        group.MapGithubOAuthEndpoints();
        group.MapGithubUserInfoEndpoints();
        group.MapGithubGistsEndpoints();

        return app;
    }
}