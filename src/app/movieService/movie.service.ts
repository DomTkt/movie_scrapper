import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseUrl = "http://www.omdbapi.com/"

  apiKey = '75522b56';

  constructor(private http:HttpClient) {
    
   }

  searchMovie(search: string) {
    return new Promise(resolve => {
        this.http.get(this.baseUrl + "?apikey=" + this.apiKey + "&" + 's=' + search + '&type=movie')
            .subscribe(data => {
                // @ts-ignore
                resolve(data.Search);
            }, err => {
                console.log(err);
            });
    })
}


}
