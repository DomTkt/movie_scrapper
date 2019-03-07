import { SaisonDetails } from './../../models/saisonDetails';
import { MediaId } from './../../models/mediaId';
import { SearchIMDB } from './../../models/searchIMDB';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Type } from '@angular/compiler/src/core';
import { TypeMedia } from 'src/models/typeMedia';
import { EpisodeDetails } from 'src/models/episodeDetails';

@Injectable({
  providedIn: 'root'
})
export class OmdbApiService {

  baseUrl = "http://www.omdbapi.com/"

  apiKey = '75522b56';

  constructor(private http:HttpClient) {
    
   }

   private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse) {
    console
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    }
    return throwError('Something bad happened; please try again later.');
  }

  searchMovie(search: string, nbPage : Number) : Observable<SearchIMDB>{
            return this.http.get(this.baseUrl + "?apikey=" + this.apiKey + "&" + 's=' + search + '&type='+ TypeMedia.Movie + '&page=' + nbPage)
            .pipe(map((searchMovie: SearchIMDB) => searchMovie), catchError(this.handleError));
            
}

searchSerie(search: string) : Observable<SearchIMDB> {
    return this.http.get(this.baseUrl + "?apikey=" + this.apiKey + "&" + 's=' + search + '&type='+ TypeMedia.Serie)
    .pipe(map((searchSerie: SearchIMDB) => searchSerie), catchError(this.handleError));
}

searchMediaById(id: string) : Observable<MediaId> {
    return this.http.get(this.baseUrl + "?apikey=" + this.apiKey + "&" + 'i=' + id)
    .pipe(map((searchMediaId: MediaId) => searchMediaId), catchError(this.handleError));
}

searchSaisonById(id : string, seasonNumber : string): Observable<SaisonDetails> {
    return this.http.get(this.baseUrl + "?apikey=" + this.apiKey + "&" + 'i=' + id + '&type='+ TypeMedia.Serie + "&Season=" + seasonNumber)
    .pipe(map((saisonDetails: SaisonDetails) => saisonDetails), catchError(this.handleError));
}

searchEpisodeSaisonById(id : string, seasonNumber : string, episodeNumber : string) : Observable<EpisodeDetails>{
    return this.http.get(this.baseUrl + "?apikey=" + this.apiKey + "&" + 'i=' + id + '&type='+ TypeMedia.Serie + "&Season=" + seasonNumber + "&Episode=" + episodeNumber)
    .pipe(map((episodeDetails: EpisodeDetails) => episodeDetails), catchError(this.handleError));
  }

}
