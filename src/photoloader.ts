import { API_URL } from './config';

export async function loadPicture(idPicture: number): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/photos/${idPicture}/`, {
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        // L'API retourne { photo: { ... }, links: { ... } }
        // On retourne la description de la photo
        return data.photo;
    } catch (error) {
        console.error("Erreur lors de la récupération de la photo:", error);
        throw error;
    }
}
