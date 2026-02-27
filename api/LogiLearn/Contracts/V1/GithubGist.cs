namespace LogiLearn.Contracts.V1;

public record GithubGist
{
    public required string Id { get; set; }
    public required string Url { get; set; }
    public required string Html_url { get; init; }
    public required bool Public { get; set; }
    public required string Description { get; set; }
    public required Dictionary<string, GithubGistFile> Files { get; set; }

    public record GithubGistFile
    {
        public required string Filename { get; set; }
        public string? Content { get; set; }
        public required string Raw_url { get; set; }
    }
}