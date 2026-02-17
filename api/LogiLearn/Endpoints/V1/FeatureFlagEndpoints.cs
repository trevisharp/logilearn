using LogiLearn.Infrastrucutre;
using Microsoft.AspNetCore.Mvc;

namespace LogiLearn.Endpoints.V1;

public static class FeatureFlagEndpoints
{
    public static RouteGroupBuilder MapFeatureFlagEndpoints(this RouteGroupBuilder route)
    {
        route.MapGet("/flags", async ([FromServices]FeatureFlagService flagService) =>
        {
            return Results.Ok(flagService.Get());
        });

        return route;
    }
}