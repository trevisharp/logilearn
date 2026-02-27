namespace LogiLearn.Contracts.V1;

public record UpdateGistData
{
    public required string Description { get; init; }

    public required Dictionary<string, UpdateGistFileData> Files { get; init; }

    public record UpdateGistFileData
    {
        public required string? Content { get; init; }
    }
    
}