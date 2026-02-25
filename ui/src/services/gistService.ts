import { http } from "./http";

export async function getAllUserGists() {
    const response = await http.get("/user")
    return response.data
}