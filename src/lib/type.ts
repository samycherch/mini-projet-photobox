export interface Link {
    href: string;
}

export interface Links {
    categorie?: Link;
    comments?: Link;
}

export interface Photo {
    id: number;
    titre: string;
    file: string;
    type: string;
    url: Link;
    descr: string;
    width: number;
    height: number;
    links: Links;
}

export interface Category {
    id: number;
    nom: string;
    descr: string;
}

export interface Comment {
    id: number;
    pseudo: string;
    date: string;
    content: string;
}