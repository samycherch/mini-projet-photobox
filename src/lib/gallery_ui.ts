import type { Gallery } from "./gallery.js";
import { openLightbox } from "./lightbox.js";

export function display_galerie(gallery: Gallery): void {
    const container = document.querySelector('#la_galerie');
    if (!container) {
        console.error("Élément #la_galerie introuvable dans le HTML.");
        return;
    }

    container.innerHTML = '';

    gallery.photos.forEach((photo, index) => {
        const img = document.createElement('img');
        img.src = `https://webetu.iutnc.univ-lorraine.fr${photo.thumbnail.href}`;
        img.alt = photo.titre;
        img.dataset['photoId'] = String(photo.id);

        img.addEventListener('click', () => {
            openLightbox(gallery.photos, index);
        });

        container.appendChild(img);
    });
}