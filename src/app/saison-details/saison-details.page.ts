import { SaisonDetails } from './../../models/saisonDetails';
import { OmdbApiService } from './../omdbApiService/omdb-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saison-details',
  templateUrl: './saison-details.page.html',
  styleUrls: ['./saison-details.page.scss'],
})
export class SaisonDetailsPage implements OnInit {

  saisonSearchById: SaisonDetails;
  id: string;
  seasonNumber : string;

  constructor(private route: ActivatedRoute, private omdbService : OmdbApiService, private router : Router) {

  }

  getSaisonSearchById() {
    this.omdbService.searchSaisonById(this.id, this.seasonNumber)
    .subscribe(data => {
      console.log(data)
      this.saisonSearchById = data;
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(): void{
    this.id = this.route.snapshot.paramMap.get('id');
    this.seasonNumber = this.route.snapshot.paramMap.get('numberSeason');
    this.getSaisonSearchById();
  }

    clickItem(id : Number, saisonNumber : Number, episodeNumber : Number ){
    this.router.navigateByUrl('/episode-saison/'+id+"/"+saisonNumber+"/"+episodeNumber)
  }

}
