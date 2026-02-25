using LogiLearn.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace LogiLearn.Endpoints.V1;

public static class FeatureFlagEndpoints
{
    public static IEndpointRouteBuilder MapFeatureFlagEndpoints(this IEndpointRouteBuilder route)
    {
        route.MapGet("/flags", async ([FromServices]FeatureFlagService flagService) =>
        {
            return Results.Ok(flagService.Get());
        });

        return route;
    }
}