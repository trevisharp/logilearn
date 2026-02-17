using System.Text.Json;
using LogiLearn.Contracts.V1;

namespace LogiLearn.Infrastrucutre;

public class FeatureFlagService
{
    FeatureFlags current;
    DateTime nextUpdate;

    public FeatureFlagService()
    {
        nextUpdate = DateTime.UtcNow.AddSeconds(15);
        var json = File.ReadAllText("featureflags.json");
        current = JsonSerializer.Deserialize<FeatureFlags>(json) ?? new();
    }

    public async Task<FeatureFlags> Get()
    {
        if (DateTime.UtcNow < nextUpdate)
            return current;
        
        await UpdateFlags();
        return current;
    }

    async Task UpdateFlags()
    {
        nextUpdate = DateTime.UtcNow.AddSeconds(15);
        var json = await File.ReadAllTextAsync("featureflags.json");
        current = JsonSerializer.Deserialize<FeatureFlags>(json) ?? new();
    }
}