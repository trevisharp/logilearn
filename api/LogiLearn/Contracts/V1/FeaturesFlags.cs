namespace LogiLearn.Contracts.V1;

public record FeatureFlags
{
    public bool AICircuitGenerator { get; init; } = false;
}