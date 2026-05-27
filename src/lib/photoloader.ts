import { API_URL } from "./config";
import type { Photo, Category, Comment } from './type.js';


export async function loadPicture(idPicture: number): Promise<Photo> {
    const url = `${API_URL}/photos/${idPicture}`;
    try {
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        // Les données sont dans data.photo, les liens dans data.links
        return { ...data.photo, links: data.links };
    } catch (error) {
        console.error("Erreur :", error);
        throw error;
    }
}

export async function loadResource<T>(uri: string): Promise<T> {
    const url = uri.startsWith("http") ? uri : `https://webetu.iutnc.univ-lorraine.fr${uri}`;
    console.log("Chargement de la ressource à l'adresse :", url);
    try {
        const response = await fetch(url, { credentials: "include" });
        console.log("Réponse brute de la ressource :", response);
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status} : impossible de charger la ressource à l'adresse ${url}`);
        }
        return await (response.json() as Promise<T>);
    } catch (error) {
        console.error("Erreur :", error);
        throw error;
    }
}