export interface SaisonDetails {
    Title:        string;
    Season:       string;
    totalSeasons: string;
    Episodes:     Episode[];
    Response:     string;
}

export interface Episode {
    Title:      string;
    Released:   string;
    Episode:    string;
    imdbRating: string;
    imdbID:     string;
}
