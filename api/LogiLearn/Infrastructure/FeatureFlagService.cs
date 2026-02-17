using LogiLearn.Contracts.V1;
using Microsoft.Extensions.Options;

namespace LogiLearn.Infrastrucutre;

public class FeatureFlagService(IOptionsMonitor<FeatureFlags> flags)
{
    private readonly IOptionsMonitor<FeatureFlags> flags = flags;

    public FeatureFlags Get()
        => flags.CurrentValue;
}