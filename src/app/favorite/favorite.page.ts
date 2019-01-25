import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DetailsPage } from './../details/details.page';
import { FavoriteService } from './../favoriteService/favorite.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit{

  ngOnInit(): void {
     console.log("passe")
  }

  favoriteMedias: any[] = [];
  id : string;
 
  constructor(
    private favoriteService: FavoriteService, private router : Router
  ) {}


 
  ionViewDidLoad() {
    console.log("passe")
  }
 
  ionViewWillEnter() {
    console.log("passe")
    this.favoriteMedias = [];
    this.initFavoriteMovies();
  }
 
  private initFavoriteMovies() {
    this.favoriteService
      .getFavoriteMedias()
      .then(favs => (this.favoriteMedias = favs));
  }
 
  findMovie() {
    //this.navCtrl.push(Fa);
  }
 
  goToDetail(media: any) {
    this.id = media.imdbID;
    this.router.navigateByUrl('/details/'+this.id)
  }

  
  ionRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.ionViewWillEnter()
      event.target.complete();
    }, 1000);
}
ionPull(){
  console.log('ionPull Event Triggered!');
}
ionStart(){

  console.log('ionStart Event Triggered!');
}
}