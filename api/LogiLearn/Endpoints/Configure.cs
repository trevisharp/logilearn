using LogiLearn.Endpoints.V1;

namespace LogiLearn.Endpoints;

public static class Configure
{
    public static WebApplication MapV1Endpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/v1");

        group.MapFeatureFlagEndpoints();

        return app;
    }
}