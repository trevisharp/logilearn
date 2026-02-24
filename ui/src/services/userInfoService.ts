import { http } from "./http";

export async function getUserInfo() {
    const response = await http.get("/user")
    return response.data
}