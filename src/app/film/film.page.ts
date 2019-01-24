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

  public hideToolbar : boolean;
  public nbPage : number = 1;

  infoMoviesDefault: any;
  allPageInfoMovies = [];
  searchString: string;
  lastSearchTitle: String = "";
  hasMovie: boolean;
  filmNotFound : boolean;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private omdbService : OmdbApiService, private router: Router) {
    this.getInfoMovies()
  }

  /*getMoviesSearch() {
    console.log(this.searchString)
    this.omdbService.searchMovie(this.searchString, this.nbPage)
    .then(data => {
      this.infoMoviesDefault = data;
    });
  }*/

async getInfoMovies() {
  this.omdbService.searchMovie(this.searchString, this.nbPage)
    .subscribe(res => {
      console.log(res);

      if (this.searchString == undefined){
        this.hasMovie = false;
      } else {
        this.hasMovie = true;
      }

      if(res.Response == "False")
        {
          this.filmNotFound = true;
          this.allPageInfoMovies = [];
        }
        else{

          this.filmNotFound = false;

      this.infoMoviesDefault = res.Search;

      if (this.lastSearchTitle != this.searchString){
        this.allPageInfoMovies = [];
      }
      for(let i=0; i<this.infoMoviesDefault.length; i++)
        {
          this.allPageInfoMovies.push(this.infoMoviesDefault[i]);
        }
      }
      this.lastSearchTitle = this.searchString
    }, err => {
      console.log(err);
    });
  
}

  clickItem(id : Number){
    console.log(id)
    this.router.navigateByUrl('/details/'+id)
  }

  hide(){
      this.hideToolbar = !this.hideToolbar;
  }

  ngOnInit() {
  }

  loadData(infiniteScroll){
    //console.log('Begin async operation');

    setTimeout(async() => {
      this.nbPage++;
      this.getInfoMovies();

      //console.log('Async operation has ended');
      infiniteScroll.target.complete();
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
