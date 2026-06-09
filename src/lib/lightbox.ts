import { loadPicture } from "./photoloader.js";
import type { GalleryPhoto } from "./gallery.js";

let currentPhotos: GalleryPhoto[] = [];
let currentIndex: number = 0;

const lightbox     = document.querySelector('#lightbox') as HTMLElement;
const content      = document.querySelector('#lightbox_content') as HTMLElement;
const btnClose     = document.querySelector('#lightbox_close') as HTMLButtonElement;
const btnPrev      = document.querySelector('#lightbox_prev') as HTMLButtonElement;
const btnNext      = document.querySelector('#lightbox_next') as HTMLButtonElement;

async function showPhoto(index: number): Promise<void> {
    currentIndex = index;
    const photo = currentPhotos[currentIndex];
    const data = await loadPicture(photo.id);

    content.innerHTML = `
        <figure>
            <img src="https://webetu.iutnc.univ-lorraine.fr${data.url.href}" alt="${data.titre}">
            <figcaption>
                <strong>${data.titre}</strong><br>
                ${data.descr}
            </figcaption>
        </figure>
    `;
}

export function openLightbox(photos: GalleryPhoto[], index: number): void {
    currentPhotos = photos;
    lightbox.classList.remove('hidden');
    showPhoto(index);
}

function closeLightbox(): void {
    lightbox.classList.add('hidden');
    content.innerHTML = '';
}

btnClose.addEventListener('click', closeLightbox);

btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        showPhoto(currentIndex - 1);
    }
});

btnNext.addEventListener('click', () => {
    if (currentIndex < currentPhotos.length - 1) {
        showPhoto(currentIndex + 1);
    }
});

// Fermer avec la touche Échap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && currentIndex > 0) showPhoto(currentIndex - 1);
    if (e.key === 'ArrowRight' && currentIndex < currentPhotos.length - 1) showPhoto(currentIndex + 1);
});