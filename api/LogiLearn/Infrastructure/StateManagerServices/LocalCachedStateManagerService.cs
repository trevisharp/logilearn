using System.Security.Cryptography;
using Microsoft.Extensions.Caching.Memory;

namespace LogiLearn.Infrastructure.StateManagerServices;

/// <summary>
/// Local manager for state random strings.
/// This implementation will not work for backend multi-instance.
/// In case of use of kubernets or any horizontal scaling change implementation.
/// </summary>
public class LocalCachedStateManagerService(IMemoryCache cache) : IStateManagerService
{
    public string GenNewState(int duration = 300)
    {
        var randomBytes = RandomNumberGenerator.GetBytes(32);
        var state = Convert.ToBase64String(randomBytes);
        state = RemoveProblematicUrlChars(state);

        cache.Set(state, true, TimeSpan.FromSeconds(duration));

        return state;
    }

    static string RemoveProblematicUrlChars(string str)
        => str.Replace('/', '_').Replace("=", "-");

    public bool Exists(string? state)
        => state is not null && cache.TryGetValue(state, out _);
}