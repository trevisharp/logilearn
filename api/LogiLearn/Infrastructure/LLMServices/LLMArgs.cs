namespace LogiLearn.Infrastructure.LLMServices;

public class LLMArgs
{
    public required Message[] Messages { get; set; }

    public required string Model { get; set; }

    public record Message(string Role, string Content);
}