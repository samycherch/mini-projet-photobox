import { loadPicture, loadResource } from './photoloader.js';
import type { Photo, Category, Comment } from './photoloader.js';
import { displayPicture, displayCategory, displayComments } from './ui.js';

async function getCategoryForPhoto(photo: Photo): Promise<Category> {
    if (!photo.links.categorie) {
        throw new Error("Lien de catégorie absent pour cette photo.");
    }
    const data = await loadResource<{ categorie: Category }>(photo.links.categorie.href);
    return data.categorie;
}

async function getCommentsForPhoto(photo: Photo): Promise<Comment[]> {
    if (!photo.links.comments) {
        return [];
    }
    const raw = await loadResource<{ comments: Comment[] }>(photo.links.comments.href);
    return raw.comments ?? [];
}

async function getPicture(id: number): Promise<void> {
    try {
        const photo = await loadPicture(id);
        displayPicture(photo);

        getCategoryForPhoto(photo)
            .then(category => displayCategory(category))
            .catch(() => {
                const span = document.querySelector('#la_categorie');
                if (span) span.textContent = "Inconnue";
            });

        getCommentsForPhoto(photo)
            .then(comments => displayComments(comments))
            .catch(err => console.error("Erreur commentaires :", err));

    } catch (error) {
        console.error(`Impossible de charger la photo ${id} :`, error);
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