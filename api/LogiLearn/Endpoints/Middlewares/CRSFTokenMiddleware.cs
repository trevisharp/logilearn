using LogiLearn.Endpoints.Attributes;

namespace LogiLearn.Endpoints.Middlewares;

public static class CRSFTokenMiddleware
{
    public static IApplicationBuilder UseCRSFTokenMiddleware(this IApplicationBuilder app)
    {
        app.Use(async (ctx, next) =>
        {
            var attribute = ctx.GetEndpoint()?.Metadata
                .GetMetadata<RequireCSRFTokenAttribute>();
            if (attribute == null)
            {
                await next();
                return;
            }

            var csrftoken = ctx.Request.Headers["X-CSRF-Token"].FirstOrDefault();
            if (!ctx.Request.Cookies.TryGetValue("csrf-token", out var sessionToken) || csrftoken != sessionToken)
            {
                ctx.Response.StatusCode = StatusCodes.Status403Forbidden;
                await ctx.Response.WriteAsync("CSRF token inválido.");
                return;
            }

            await next();
        });

        return app;
    }
}