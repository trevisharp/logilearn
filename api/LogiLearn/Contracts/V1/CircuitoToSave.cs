namespace LogiLearn.Contracts.V1;

public record CircuitToSave
{
    public required string Description { get; init; }
    public required string Circuit { get; init; }
}