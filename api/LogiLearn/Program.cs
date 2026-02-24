using LogiLearn.Contracts.V1;
using LogiLearn.Endpoints;
using LogiLearn.Infrastructure;
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
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Configuration
    .AddJsonFile("featureflags.json", optional: false, reloadOnChange: true);
builder.Services.Configure<FeatureFlags>(builder.Configuration);

builder.Services.AddMemoryCache();

builder.Services.AddTransient<ILLMService, OpenAILLMService>();
builder.Services.AddTransient<IOAuthService, GithubOAuthService>();
builder.Services.AddScoped<IStateManagerService, LocalCachedStateManagerService>();
builder.Services.AddSingleton<FeatureFlagService>();

var app = builder.Build();

app.UseCors("FrontendPolicy");

app.MapV1Endpoints();

if (app.Environment.IsDevelopment())
    app.MapOpenApi();

app.UseHttpsRedirection();

app.Run();