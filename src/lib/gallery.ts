import { API_URL } from "./config.js";
import { loadResource } from "./photoloader.js";

export interface GalleryPhoto {
    id: number;
    titre: string;
    file: string;
    thumbnail: { href: string };
    original: { href: string };
}

export interface GalleryLinks {
    first?: { href: string };
    last?:  { href: string };
    next?:  { href: string };
    prev?:  { href: string };
}

export interface Gallery {
    photos: GalleryPhoto[];
    links: GalleryLinks;
}

let currentGallery: Gallery = { photos: [], links: {} };

export async function load(): Promise<Gallery> {
    const data = await loadResource<{ photos: { photo: GalleryPhoto }[]; links: GalleryLinks }>(
        `${API_URL}/photos`
    );
    currentGallery = {
        photos: data.photos.map(item => item.photo),
        links: data.links
    };
    return currentGallery;
}