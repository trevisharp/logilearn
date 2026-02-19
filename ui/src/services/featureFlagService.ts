import { http } from "./http";

export async function requestFeatureFlags() {
    const response = await http.get("/flags")
    return response.data
}