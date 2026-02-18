namespace LogiLearn.Contracts.V1;

public record AIRequest
{
    public required string Prompt { get; init; }
    public required int Width { get; init; } = 800;
    public required int Height { get; init; } = 600;
}