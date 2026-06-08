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

async function loadGalleryFromUri(uri: string): Promise<Gallery> {
    const data = await loadResource<{ photos: { photo: GalleryPhoto }[]; links: GalleryLinks }>(uri);
    currentGallery = {
        photos: data.photos.map(item => item.photo),
        links: data.links
    };
    return currentGallery;
}

export async function load(): Promise<Gallery> {
    return loadGalleryFromUri(`${API_URL}/photos`);
}

export async function next(): Promise<Gallery> {
    if (!currentGallery.links.next) throw new Error("Pas de page suivante.");
    return loadGalleryFromUri(`https://webetu.iutnc.univ-lorraine.fr${currentGallery.links.next.href}`);
}

export async function prev(): Promise<Gallery> {
    if (!currentGallery.links.prev) throw new Error("Pas de page précédente.");
    return loadGalleryFromUri(`https://webetu.iutnc.univ-lorraine.fr${currentGallery.links.prev.href}`);
}

export async function first(): Promise<Gallery> {
    if (!currentGallery.links.first) throw new Error("Pas de première page.");
    return loadGalleryFromUri(`https://webetu.iutnc.univ-lorraine.fr${currentGallery.links.first.href}`);
}

export async function last(): Promise<Gallery> {
    if (!currentGallery.links.last) throw new Error("Pas de dernière page.");
    return loadGalleryFromUri(`https://webetu.iutnc.univ-lorraine.fr${currentGallery.links.last.href}`);
}