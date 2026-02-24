namespace LogiLearn.Contracts.V1;

public record GithubUserData
{
    public required string Login { get; init; }
    public required string Html_url { get; init; }
    public required string Name { get; init; }
    public required string Avatar_url { get; init; }
}