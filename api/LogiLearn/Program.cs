using LogiLearn.Contracts.V1;
using LogiLearn.Endpoints;
using LogiLearn.Infrastructure;
using LogiLearn.Infrastructure.LLMServices;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Configuration
    .AddJsonFile("featureflags.json", optional: false, reloadOnChange: true);
builder.Services.Configure<FeatureFlags>(builder.Configuration);

builder.Services.AddTransient<ILLMService, OpenAILLMService>();
builder.Services.AddSingleton<FeatureFlagService>();

var app = builder.Build();

app.MapV1Endpoints();

if (app.Environment.IsDevelopment())
    app.MapOpenApi();

app.UseHttpsRedirection();

app.Run();
