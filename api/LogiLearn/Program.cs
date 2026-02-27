using LogiLearn.Contracts.V1;
using LogiLearn.Endpoints;
using LogiLearn.Infrastructure;
using LogiLearn.Infrastructure.GithubServices;
using LogiLearn.Infrastructure.LLMServices;
using LogiLearn.Infrastructure.OAuthServices;
using LogiLearn.Infrastructure.StateManagerServices;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var allowedOrigin = builder.Configuration["FRONTEND_URL"]?.Split(' ') ?? [];
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .WithOrigins(allowedOrigin!)
            .AllowCredentials()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.None;
    options.IdleTimeout = TimeSpan.FromMinutes(30);
});

builder.Configuration
    .AddJsonFile("featureflags.json", optional: false, reloadOnChange: true);
builder.Services.Configure<FeatureFlags>(builder.Configuration);

builder.Services.AddMemoryCache();

builder.Services.AddTransient<ILLMService, GeminiLLMService>();
builder.Services.AddTransient<IOAuthService, GithubOAuthService>();
builder.Services.AddScoped<IGithubClientBuilder, GithubClientBuilder>();
builder.Services.AddScoped<IStateManagerService, LocalCachedStateManagerService>();
builder.Services.AddSingleton<FeatureFlagService>();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseRouting();

app.UseSession();

app.UseCors("FrontendPolicy");

app.MapV1Endpoints();

app.Run();