import { loadPicture, loadResource } from './photoloader.js';
import type { Photo, Category, Comment } from './photoloader.js';
import { displayPicture, displayCategory, displayComments } from './ui.js';

async function getCategoryForPhoto(photo: Photo): Promise<Category> {
    if (!photo.links.categorie) {
        throw new Error("Lien de catégorie absent pour cette photo.");
    }
    return await loadResource<Category>(photo.links.categorie.href);
}

async function getCommentsForPhoto(photo: Photo): Promise<Comment[]> {
    if (!photo.links.commentaires) {
        return [];
    }
    const result = await loadResource<{ commentaires: Comment[] }>(photo.links.commentaires.href);
    return result.commentaires;
}

async function getPicture(id: number): Promise<void> {
    try {
        const photo = await loadPicture(id);
                console.log("Réponse brute :", JSON.stringify(photo)); // ← ajoute cette ligne

        console.log(`[Photo ${id}] Titre: ${photo.titre}, Type: ${photo.type}, URL: ${photo.url}`);
        displayPicture(photo);

        getCategoryForPhoto(photo)
            .then(category => displayCategory(category))
            .catch(err => {
                console.error("Erreur de catégorie :", err);
                const categorySpan = document.querySelector('#la_categorie');
                if (categorySpan) categorySpan.textContent = "Inconnue";
            });

        getCommentsForPhoto(photo)
            .then(comments => displayComments(comments))
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