import { SearchIMDB, Search } from './../../models/searchIMDB';
import { DetailsPage } from './../details/details.page';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { OmdbApiService } from './../omdbApiService/omdb-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.page.html',
  styleUrls: ['./serie.page.scss'],
})
export class SeriePage implements OnInit {

  itemIdClick: string;
  hideToolbar: boolean = true;
  detailPage: DetailsPage

  searchString: string;

  nbPage: number = 1;
  infoSeriesDefault: SearchIMDB;
  allPageInfoSeries: Array<Search>;
  lastSearchTitle: String = "";
  hasSerie: boolean;
  serieNotFound: boolean;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private omdbService: OmdbApiService, private router: Router) {
    this.getInfoSeries()
  }

  async getInfoSeries() {
    this.omdbService.searchSerie(this.searchString)
      .subscribe(res => {
        
        if (this.searchString == undefined || this.searchString == "") {
          this.hasSerie = false;
        } else {
          this.hasSerie = true;
        }

        if (res.Response == "False") {
          this.serieNotFound = true;
          this.allPageInfoSeries = new Array<Search>();
        }
        else {

          this.serieNotFound = false;

          this.infoSeriesDefault = res;

          if (this.lastSearchTitle != this.searchString) {
            this.allPageInfoSeries = new Array<Search>();
          }
          for (let i = 0; i < this.infoSeriesDefault.Search.length; i++) {
            this.allPageInfoSeries.push(this.infoSeriesDefault.Search[i]);
          }
        }
        this.lastSearchTitle = this.searchString
      }, err => {
        console.log(err);
      });

  }

  clickItem(id: Number) {
    this.router.navigateByUrl('/details/' + id)
  }

  hide() {
    this.hideToolbar = !this.hideToolbar;
  }

  ngOnInit() {

  }

  loadData(infiniteScroll) {

    setTimeout(async () => {
      this.nbPage++;
      this.getInfoSeries();
      infiniteScroll.target.complete();
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
