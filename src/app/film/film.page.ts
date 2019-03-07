
import { SearchIMDB, Search } from './../../models/searchIMDB';

import { Router } from '@angular/router';
import { OmdbApiService } from './../omdbApiService/omdb-api.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-film',
  templateUrl: './film.page.html',
  styleUrls: ['./film.page.scss'],
})
export class FilmPage implements OnInit {

  hideToolbar : boolean = true;
  nbPage : number = 1;

  infoMoviesDefault: SearchIMDB;
  allPageInfoMovies: Array<Search>;
  searchString: string;
  lastSearchTitle: String = "";
  hasMovie: boolean;
  filmNotFound : boolean;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private omdbService : OmdbApiService, private router: Router) {
    this.allPageInfoMovies = new Array<Search>();
    this.getInfoMovies();
  }

async getInfoMovies() {
  this.omdbService.searchMovie(this.searchString, this.nbPage)
    .subscribe(res => {
      console.log(res)
      if (this.searchString == undefined){
        this.hasMovie = false;
      } else {
        this.hasMovie = true;
      }

      if(res.Response == "False")
        {
          this.filmNotFound = true;
          this.allPageInfoMovies = new Array<Search>();
        }
        else{

          this.filmNotFound = false;

      this.infoMoviesDefault = res;

      if (this.lastSearchTitle != this.searchString){
        this.allPageInfoMovies = [];
      }
      for(let i=0; i<this.infoMoviesDefault.Search.length; i++)
        {
          this.allPageInfoMovies.push(this.infoMoviesDefault.Search[i]);
        }
      }
      this.lastSearchTitle = this.searchString
    }, err => {
      console.log(err);
    });
  
}

  clickItem(id : Number){
    this.router.navigateByUrl('/details/'+id)
  }

  hide(){
      this.hideToolbar = !this.hideToolbar;
  }

  ngOnInit() {
  }

  loadData(infiniteScroll){

    setTimeout(async() => {
      this.nbPage++;
      this.getInfoMovies();
      infiniteScroll.target.complete();
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
