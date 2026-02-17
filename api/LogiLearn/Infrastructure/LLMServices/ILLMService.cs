namespace LogiLearn.Infrastructure.LLMServices;

public interface ILLMService
{
    Task<LLMResult> Get(LLMArgs args);
}