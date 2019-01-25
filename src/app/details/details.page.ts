import { NavController, NavParams } from '@ionic/angular';
import { FavoriteService } from './../favoriteService/favorite.service';
import { OmdbApiService } from './../omdbApiService/omdb-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

   mediaSearchById: any;
   id: string;
   fakeArray: number[] = []; 
   isFavorite: boolean = false;

  constructor(private route: ActivatedRoute, private omdbService : OmdbApiService, private router : Router, private favoriteService: FavoriteService) {
    
   console.log("constructor");
  }

  getSeriesSearchById() {
    console.log('getSeriesSearchById');
    this.omdbService.searchSerieById(this.id)
    .subscribe(data => {
      this.fakeArray = []
      this.mediaSearchById = data;
      console.log(this.mediaSearchById.totalSeasons)
      for (let i = 0; i < this.mediaSearchById.totalSeasons; i++) {
        this.fakeArray.push(i+1);
      }
      console.log(this.fakeArray.length)
    })
  }

  getMoviesSearchById() {
    this.omdbService.searchMovieById(this.id)
    .subscribe(data => {
      this.mediaSearchById = data;
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

  ionViewDidEnter(){
    this.favoriteService
    .isFavortieMedia(this.mediaSearchById)
    .then(value => (this.isFavorite = value));
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteService.toogleFavoriteMedia(this.mediaSearchById);
  }
  ngOnInit() {

  }

}
