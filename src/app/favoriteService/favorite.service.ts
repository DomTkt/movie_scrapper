import { MediaId } from './../../models/mediaId';
import { FavoriteMedia } from './../../models/favoriteMedia';
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
 
const MEDIA_KEY = "media_";
 
@Injectable({
  providedIn : 'root'
})
export class FavoriteService {
  constructor(private storage: Storage) {
  }
 
  addFavoriteMedia(media: MediaId) {
    this.storage.set(this.getMediaKey(media), JSON.stringify(media));
  }
 
  removeFavoriteMedia(media: MediaId) {
    this.storage.remove(this.getMediaKey(media));
  }
 
  isFavortieMedia(media: any) {
    return this.storage.get(this.getMediaKey(media));
  }
 
  toogleFavoriteMedia(media: any) {
    this.isFavortieMedia(media).then(
      isFavorite =>
        isFavorite
          ? this.removeFavoriteMedia(media)
          : this.addFavoriteMedia(media)
    );
  }
 
  getMediaKey(media: MediaId) {
    return MEDIA_KEY + media.imdbID;
  }
 
  getFavoriteMedias(): Promise<MediaId[]> {
    return new Promise(resolve => {
      let results: MediaId[] = [];
      this.storage
        .keys()
        .then(keys =>
          keys
            .filter(key => key.includes(MEDIA_KEY))
            .forEach(key =>
              this.storage.get(key).then(data => results.push(JSON.parse(data)))
            )
        );
      return resolve(results);
    });
  }
}