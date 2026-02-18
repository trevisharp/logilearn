using System.Text.Json;
using System.Net.Http.Headers;

namespace LogiLearn.Infrastructure.LLMServices;

public class OpenAILLMService(IConfiguration configuration, ILogger<OpenAILLMService> logger) : ILLMService
{
    public async Task<LLMResult> GetCompletion(LLMArgs args)
    {
        var apiKey = configuration["OPENAI_API_KEY"];
        if (apiKey is null)
        {
            if (logger.IsEnabled(LogLevel.Error))
                logger.LogError("Erro OpenAI: missing OPENAI_API_KEY enviroment key.");
            throw new ApplicationException("Erro OpenAI: missing OPENAI_API_KEY enviroment key.");
        }
        
        var client = new HttpClient {
            BaseAddress = new Uri("https://api.openai.com/v1/"),
        };

        client.DefaultRequestHeaders.Authorization = 
            new AuthenticationHeaderValue("Bearer", apiKey);

        var payload = new {
            model = args.Model,
            n = 1,
            verbosity = "low",
            messages = args.Messages
        };

        var response = await client.PostAsync(
            "chat/completions", JsonContent.Create(payload)
        );

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            if (logger.IsEnabled(LogLevel.Error))
                logger.LogError("Erro OpenAI: {Content}", error);
            throw new ApplicationException($"Erro OpenAI: {error}");
        }

        var document = await JsonDocument.ParseAsync(
            await response.Content.ReadAsStreamAsync()
        );

        var output = document.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();
        if (output is null)
        {
            if (logger.IsEnabled(LogLevel.Error))
                logger.LogError("Erro OpenAI: invalid openai response.");
            throw new ApplicationException($"Erro OpenAI: invalid openai response");
        }
        
        return new() { Output = output };
    }
}