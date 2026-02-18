namespace LogiLearn.Infrastructure.LLMServices;

public interface ILLMService
{
    Task<LLMResult> GetCompletion(LLMArgs args);
}