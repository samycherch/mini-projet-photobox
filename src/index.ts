import { loadPicture } from './photoloader';

async function getPicture(id: number) {
    try {
        const photo = await loadPicture(id);
        console.log(`\n--- Informations sur la photo ${id} ---`);
        console.log("Titre:", photo.titre);
        console.log("Type:", photo.type || photo.format); 
        console.log("URL:", photo.url.href);
    } catch (error) {
        console.error(`Impossible d'afficher la photo ${id}:`, error);
    }
}

getPicture(105);

function checkHashForPicture() {
    const hash = window.location.hash;
    if (hash) {
        const id = parseInt(hash.substring(1));
        if (!isNaN(id)) {
            getPicture(id);
        }
    }
}

checkHashForPicture();

window.addEventListener('hashchange', checkHashForPicture);
