import { API_URL } from "./config.js";
import type { Photo, Category, Comment } from './type.js';

export type { Photo, Category, Comment };

export async function loadPicture(idPicture: number): Promise<Photo> {
    const url = `${API_URL}/photos/${idPicture}`;
    try {
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        return { ...data.photo, links: data.links };
    } catch (error) {
        console.error("Erreur loadPicture :", error);
        throw error;
    }
}

export async function loadResource<T>(uri: string): Promise<T> {
    const url = uri.startsWith("http") ? uri : `https://webetu.iutnc.univ-lorraine.fr${uri}`;
    try {
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        return await response.json() as T;
    } catch (error) {
        console.error("Erreur loadResource :", error);
        throw error;
    }
}