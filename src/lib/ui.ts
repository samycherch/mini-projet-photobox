import * as Handlebars from 'handlebars';
import type { Photo, Category, Comment } from './photoloader.js';

export function displayPicture(photo: Photo): void {
    const container = document.querySelector('#la_photo');
    if (!container) {
        console.error("Élément #la_photo introuvable dans le HTML.");
        return;
    }
    const templateSource = `
        <div class="photo-container">
            <h2>{{titre}}</h2>
<img src="https://webetu.iutnc.univ-lorraine.fr{{url.href}}" alt="{{titre}}" />
            <p class="meta"><em>Type : {{type}} | Résolution : {{width}}x{{height}}px</em></p>
            <p class="description">{{descr}}</p>
            <p><strong>Catégorie :</strong> <span id="la_categorie">Chargement en cours...</span></p>
            <h3>Commentaires</h3>
            <ul id="les_commentaires">
            </ul>
        </div>
    `;

    const template = Handlebars.compile(templateSource);
    container.innerHTML = template(photo);
}

export function displayCategory(category: Category): void {
    const categorySpan = document.querySelector('#la_categorie');
    if (categorySpan) {
        categorySpan.textContent = category.nom;
    }
}

export function displayComments(comments: Comment[]): void {
    const commentsList = document.querySelector('#les_commentaires');
    if (!commentsList) return;

    commentsList.innerHTML = '';

    if (comments.length === 0) {
        commentsList.innerHTML = '<li>Aucun commentaire pour cette photo.</li>';
        return;
    }

    comments.forEach(comment => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${comment.pseudo}</strong> <small>(${comment.date})</small> : ${comment.content}`;
        commentsList.appendChild(li);
    });
}