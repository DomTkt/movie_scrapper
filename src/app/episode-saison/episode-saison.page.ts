import { FavoriteService } from './../favoriteService/favorite.service';
import { OmdbApiService } from './../omdbApiService/omdb-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-episode-saison',
  templateUrl: './episode-saison.page.html',
  styleUrls: ['./episode-saison.page.scss'],
})
export class EpisodeSaisonPage implements OnInit {

  episodeSearchById : any
  id: string;
  seasonNumber : string;
  episodeNumber : string;
  isFavorite: boolean = false;

  constructor(private route: ActivatedRoute, private omdbService : OmdbApiService, private router : Router,  private favoriteService: FavoriteService) { }

  getEpisodeSaisonSearchById() {
    this.omdbService.searchEpisodeSaisonById(this.id, this.seasonNumber,this.episodeNumber)
    .subscribe(data => {
      console.log(data)
      this.episodeSearchById = data;
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(): void{
    this.id = this.route.snapshot.paramMap.get('id');
    this.seasonNumber = this.route.snapshot.paramMap.get('saisonNumber');
    console.log("test nbSaison = " + this.seasonNumber)
    this.episodeNumber = this.route.snapshot.paramMap.get('episodeNumber');
    this.getEpisodeSaisonSearchById();
  }

  ionViewDidEnter(){
    this.favoriteService
    .isFavortieMedia(this.episodeSearchById)
    .then(value => (this.isFavorite = value));
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteService.toogleFavoriteMedia(this.episodeSearchById);
  }

}
