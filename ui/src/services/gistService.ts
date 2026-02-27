import { http } from "./http";

export async function getAllUserCircuits() {
    const response = await http.get("/circuits")
    return response.data
}

export async function createNewCircuit() {
    const response = await http.post("/circuits")
    return response.data
}

export async function getUserCircuit(id: string) {
    const response = await http.get("/circuits/" + id)
    return response.data
}

export async function updateUserCircuit(id: string, description: string, circuit: string) {
    const response = await http.put("/circuits/" + id, { description, circuit })
    return response.status >= 200 && response.status < 300
}