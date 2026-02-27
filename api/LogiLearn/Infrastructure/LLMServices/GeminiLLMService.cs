using System.Text;
using Google.GenAI;

namespace LogiLearn.Infrastructure.LLMServices;

public class GeminiLLMService(IConfiguration configuration) : ILLMService
{
    public async Task<LLMResult> GetCompletion(LLMArgs args)
    {
        var messageBuilder = new StringBuilder();
        foreach (var message in args.Messages)
        {
            messageBuilder.AppendLine($"{message.Role} says:");
            messageBuilder.AppendLine(message.Content);
        }

        var client = new Client(apiKey: configuration["GEMINI_API_KEY"]);
        var response = await client.Models.GenerateContentAsync(
            model: args.Model, contents: messageBuilder.ToString()
        );

        return new LLMResult {
            Output = response.Candidates?[0].Content?.Parts?[0].Text ?? ""
        };
    }
}