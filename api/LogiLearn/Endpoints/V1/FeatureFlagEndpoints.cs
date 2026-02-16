namespace LogiLearn.Endpoints.V1;

public static class FeatureFlagEndpoints
{
    public static RouteGroupBuilder MapFeatureFlagEndpoints(this RouteGroupBuilder route)
    {
        route.MapGet("/flags", () =>
        {
            return Results.Ok();
        });

        return route;
    }
}