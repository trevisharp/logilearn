using LogiLearn.Contracts.V1;
using LogiLearn.Infrastructure.LLMServices;
using Microsoft.AspNetCore.Mvc;

namespace LogiLearn.Endpoints.V1;

public static class AIGeneratorEndpoints
{
    public static RouteGroupBuilder MapAIGeneratorEndpointsEndpoints(this RouteGroupBuilder route)
    {
        route.MapPost("/ai", async ([FromServices]ILLMService llm, [FromBody]AIRequest payload) =>
        {
            string instructions = 
            $$"""
            The user will request a digital circuit generate from a json.
            Your work is generate the json, without any other otuput, following the json example:
            {
                "gates": [
                    { "id": "in1", "x": 100, "y": 100, "type": "input" },
                    { "id": "in2", "x": 100, "y": 200, "type": "input" },
                    { "id": "port", "x": 200, "y": 100, "type": "and" },
                    { "id": "out", "x": 400, "y": 100, "type": "output" },
                ],
                "wires": [
                    { "fromId": "in1", "toId": "port" },
                    { "fromId": "in2", "toId": "port" },
                    { "fromId": "port", "toId": "out" },
                ]
            }
            Make a inline json.
            Valid types for gates: input, output, and, not.
            To positions consider the max width as {{payload.Width}} and the height as {{payload.Height}}.
            """;

            var args = new LLMArgs {
                Model = "gpt-5-mini",
                Messages = [
                    new ("developer", instructions),
                    new ("user", payload.Prompt)
                ]  
            };

            var result = await llm.GetCompletion(args);

            return Results.Ok(result.Output.Replace("\\n", ""));
        });

        return route;
    }
}