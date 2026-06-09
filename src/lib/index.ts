import { loadPicture, loadResource } from './photoloader.js';
import type { Photo, Category, Comment } from './photoloader.js';
import { displayPicture, displayCategory, displayComments } from './ui.js';
import { load, next, prev, first, last } from './gallery.js';
import { display_galerie } from './gallery_ui.js';

// ---- Exercice 1 ----

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

export async function getPicture(id: number): Promise<void> {
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

// ---- Exercices 2 & 3 ----

function attachGalleryButton(id: string, action: () => Promise<any>): void {
    const btn = document.querySelector(id);
    if (btn) {
        btn.addEventListener('click', () => {
            action()
                .then(gallery => display_galerie(gallery))
                .catch(err => console.error("Erreur navigation galerie :", err));
        });
    }
}

attachGalleryButton('#btn_load',  load);
attachGalleryButton('#btn_next',  next);
attachGalleryButton('#btn_prev',  prev);
attachGalleryButton('#btn_first', first);
attachGalleryButton('#btn_last',  last);