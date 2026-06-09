import type { Gallery } from "./gallery.js";
import { getPicture } from "./index.js";

export function display_galerie(gallery: Gallery): void {
    const container = document.querySelector('#la_galerie');
    if (!container) {
        console.error("Élément #la_galerie introuvable dans le HTML.");
        return;
    }

    container.innerHTML = '';

    gallery.photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = `https://webetu.iutnc.univ-lorraine.fr${photo.thumbnail.href}`;
        img.alt = photo.titre;
        img.dataset['photoId'] = String(photo.id);

        img.addEventListener('click', () => {
            const id = photo.id;
            getPicture(id);
            document.querySelector('#la_photo')?.scrollIntoView({ behavior: 'smooth' });
        });

        container.appendChild(img);
    });
}