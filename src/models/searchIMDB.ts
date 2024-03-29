import { TypeMedia } from "./typeMedia";

export interface SearchIMDB {
    Search:       Search[];
    totalResults: string;
    Response:     string;
}

export interface Search {
    Title:  string;
    Year:   string;
    imdbID: string;
    Type:   TypeMedia;
    Poster: string;
}