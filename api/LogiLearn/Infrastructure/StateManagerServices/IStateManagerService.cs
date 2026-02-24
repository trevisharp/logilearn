namespace LogiLearn.Infrastructure.StateManagerServices;

/// <summary>
/// Used to manage state query parameters on OAuth APIs. 
/// </summary>
public interface IStateManagerService
{
    string GenNewState(int duration = 300);
    bool Exists(string? state);
}