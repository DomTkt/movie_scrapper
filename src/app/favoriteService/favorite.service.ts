import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
 
const MOVIE_KEY = "movie_";
 
@Injectable({
  providedIn : 'root'
})
export class FavoriteService {
  constructor(private storage: Storage) {
    
  }
 
  addFavoriteMedia(movie: any) {
    this.storage.set(this.getMediaKey(movie), JSON.stringify(movie));
  }
 
  removeFavoriteMedia(movie: any) {
    this.storage.remove(this.getMediaKey(movie));
  }
 
  isFavortieMedia(movie: any) {
    return this.storage.get(this.getMediaKey(movie));
  }
 
  toogleFavoriteMedia(movie: any) {
    this.isFavortieMedia(movie).then(
      isFavorite =>
        isFavorite
          ? this.removeFavoriteMedia(movie)
          : this.addFavoriteMedia(movie)
    );
  }
 
  getMediaKey(movie: any) {
    return MOVIE_KEY + movie.imdbID;
  }
 
  getFavoriteMedias(): Promise<any[]> {
    return new Promise(resolve => {
      let results: any[] = [];
      this.storage
        .keys()
        .then(keys =>
          keys
            .filter(key => key.includes(MOVIE_KEY))
            .forEach(key =>
              this.storage.get(key).then(data => results.push(JSON.parse(data)))
            )
        );
      return resolve(results);
    });
  }
}