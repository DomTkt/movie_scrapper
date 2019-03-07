import { TypeMedia, SearchIMDB } from './../../models/searchIMDB';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Type } from '@angular/compiler/src/core';

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
            .pipe(map((searchFilm: SearchIMDB) => searchFilm), catchError(this.handleError));
            
}

searchSerie(search: string) : Observable<any> {
    return this.http.get(this.baseUrl + "?apikey=" + this.apiKey + "&" + 's=' + search + '&type='+ TypeMedia.Serie)
    .pipe(
    map(this.extractData),
    catchError(this.handleError));
}

searchSerieById(id: string) : Observable<any> {
    return this.http.get(this.baseUrl + "?apikey=" + this.apiKey + "&" + 'i=' + id + '&type=series')
    .pipe(
    map(this.extractData),
    catchError(this.handleError));
}

searchMovieById(id: string) : Observable<any> {
    return this.http.get(this.baseUrl + "?apikey=" + this.apiKey + "&" + 'i=' + id + '&type=movie')
    .pipe(
    map(this.extractData),
    catchError(this.handleError));
}

searchSaisonById(id : string, seasonNumber : string): Observable<any> {
    return this.http.get(this.baseUrl + "?apikey=" + this.apiKey + "&" + 'i=' + id + '&type=series' + "&Season=" + seasonNumber)
    .pipe(
    map(this.extractData),
    catchError(this.handleError));
}

searchEpisodeSaisonById(id : string, seasonNumber : string, episodeNumber : string) : Observable<any>{
    return this.http.get(this.baseUrl + "?apikey=" + this.apiKey + "&" + 'i=' + id + '&type=series' + "&Season=" + seasonNumber + "&Episode=" + episodeNumber)
    .pipe(
    map(this.extractData),
    catchError(this.handleError));
  }

}
