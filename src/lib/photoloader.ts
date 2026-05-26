import { API_URL } from "../config.js";

export async function loadPicture(idPicture: number): Promise<Record<string, unknown>> {
    const url = `${API_URL}/photos/${idPicture}`;

    try {
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status} : impossible de charger la photo ${idPicture}`);
        }
        return await (response.json() as Promise<Record<string, unknown>>);
    } catch (error) {
        console.error("Erreur :", error);
        throw error;
    }
}