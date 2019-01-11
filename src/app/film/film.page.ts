
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MovieService } from '../movieService/movie.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.page.html',
  styleUrls: ['./film.page.scss'],
})
export class FilmPage implements OnInit {

  public movieSearch: any;
  public searchString : string;

  constructor(private movieService : MovieService ) {
    this.getMoviesSearch()
  }

  getMoviesSearch() {
    console.log(this.searchString)
    this.movieService.searchMovie(this.searchString)
    .then(data => {
      this.movieSearch = data;
    });
  }


  ngOnInit() {
  }

}
