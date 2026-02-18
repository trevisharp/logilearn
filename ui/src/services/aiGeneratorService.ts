import { http } from "./http";

export async function requestGeneration(prompt: string, width: number, height: number) {
    const response = await http.post("/ai", {
        prompt, width, height
    })
    return response.data
}