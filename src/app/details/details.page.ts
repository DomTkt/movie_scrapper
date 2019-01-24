import { OmdbApiService } from './../omdbApiService/omdb-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  public serieSearchById: any;
  id: string;
   fakeArray: number[] = []; 
   isFavorite: boolean = false;

  constructor(private route: ActivatedRoute, private omdbService : OmdbApiService, private router : Router) {
    
   console.log("constructor");
  }

  getSeriesSearchById() {
    console.log('getSeriesSearchById');
    this.omdbService.searchSerieById(this.id)
    .subscribe(data => {
      this.serieSearchById = data;
      console.log(this.serieSearchById.totalSeasons)
      for (let i = 0; i < this.serieSearchById.totalSeasons; i++) {
        this.fakeArray.push(i+1);
      }
      console.log(this.fakeArray.length)
    })
  }

  getMoviesSearchById() {
    this.omdbService.searchMovieById(this.id)
    .subscribe(data => {
      this.serieSearchById = data;
    });
  }

  clickItem(numberSeason : Number){
    console.log(this.id, numberSeason)
    this.router.navigateByUrl('/saison-details/'+this.id+"/"+numberSeason)
  }

  ionViewWillEnter(): void{
    console.log('ionViewDidLoad');
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("id", this.id);
    this.getSeriesSearchById();
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.isFavorite = false;
    } else {
      this.isFavorite = true;
      // TODO persist data
    }
  }

  ngOnInit() {

  }
}
