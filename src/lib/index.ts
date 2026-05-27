import { loadPicture, loadResource } from './photoloader.js';
import type { Photo, Category, Comment } from './photoloader.js';
import { displayPicture, displayCategory, displayComments } from './ui.js';

async function getCategoryForPhoto(photo: Photo): Promise<Category> {
    if (!photo.links.categorie) {
        throw new Error("Lien de catégorie absent pour cette photo.");
    }

    const data = await loadResource<{ categorie: Category }>(photo.links.categorie.href);
    return data.categorie; // On extrait la bonne propriété
}

async function getCommentsForPhoto(photo: Photo): Promise<Comment[]> {
    console.log("Links disponibles :", JSON.stringify(photo.links)); // ← voir tous les liens

    if (!photo.links.commentaires) {
        console.warn("Pas de lien commentaires dans photo.links"); // ← au lieu de return [] silencieux
        return [];
    }
    if (!photo.links.commentaires) {
        return [];
    }
    const raw = await loadResource<unknown>(photo.links.commentaires.href);
    console.log("Réponse brute commentaires :", JSON.stringify(raw)); // ← ici
    
    const result = raw as { commentaires: Comment[] };
    return result.commentaires ?? [];
}

async function getPicture(id: number): Promise<void> {
    try {
        const photo = await loadPicture(id);
                console.log("Réponse brute :", JSON.stringify(photo)); // ← ajoute cette ligne

        console.log(`[Photo ${id}] Titre: ${photo.titre}, Type: ${photo.type}, URL: ${photo.url}`);
        displayPicture(photo);

        getCategoryForPhoto(photo)
            .then(category => {
                displayCategory(category);
                console.log(`[Photo ${id}] Catégorie: ${category.nom}`);
            })
            .catch(err => {
                console.error("Erreur de catégorie :", err);
                const categorySpan = document.querySelector('#la_categorie');
                if (categorySpan) categorySpan.textContent = "Inconnue";
            });

        getCommentsForPhoto(photo)
            .then(comments => {
                displayComments(comments);
                console.log(`[Photo ${id}] Commentaires: ${comments.length}`);
            })
            .catch(err => console.error("Erreur de commentaires :", err));

    } catch (error) {
        console.error(`Impossible de traiter la photo avec l'identifiant ${id}:`, error);
    }
}

function checkHashForPicture(): void {
    const hash = window.location.hash;
    if (hash) {
        const id = parseInt(hash.substring(1));
        if (!isNaN(id)) {
            getPicture(id);
            return;
        }
    }
    getPicture(105);
}

checkHashForPicture();

window.addEventListener('hashchange', checkHashForPicture);