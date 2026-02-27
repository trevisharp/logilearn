namespace LogiLearn.Contracts.V1;

public record CreateGistData
{
    public required string Description { get; init; }

    public required bool Public { get; init; }

    public required Dictionary<string, CreateGistFileData> Files { get; init; }

    public record CreateGistFileData
    {
        public required string Content { get; init; }
    }
}