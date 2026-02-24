using LogiLearn.Endpoints.V1;
using LogiLearn.Endpoints.V1.Auth;

namespace LogiLearn.Endpoints;

public static class Configure
{
    public static WebApplication MapV1Endpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/v1");

        group.MapFeatureFlagEndpoints();
        group.MapAIGeneratorEndpoints();
        group.MapGithubOAuthEndpoints();

        return app;
    }
}