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

  public serieSearch: any;
  public itemIdClick : string;
  public hideToolbar : boolean;
  detailPage : DetailsPage

  public searchString : string;

  public nbPage : number = 1;
  infoSeriesDefault: any;
  allPageInfoSeries = [];
  lastSearchTitle: String = "";
  hasSerie: boolean;
  serieNotFound : boolean;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private omdbService : OmdbApiService, private router: Router) {
    this.getInfoSeries()
  }

  /*getSeriesSearch() {
    console.log(this.searchString)
    this.omdbService.searchSerie(this.searchString)
    .then(data => {
      this.serieSearch = data;
    });
  }*/

  async getInfoSeries() {
    this.omdbService.searchSerie(this.searchString)
      .subscribe(res => {
        console.log(res);
  
        if (this.searchString == undefined || this.searchString == ""){
          this.hasSerie = false;
        } else {
          this.hasSerie = true;
        }
  
        if(res.Response == "False")
          {
            this.serieNotFound = true;
            this.allPageInfoSeries = [];
          }
          else{
  
            this.serieNotFound = false;
  
        this.infoSeriesDefault = res.Search;
  
        if (this.lastSearchTitle != this.searchString){
          this.allPageInfoSeries = [];
        }
        for(let i=0; i<this.infoSeriesDefault.length; i++)
          {
            this.allPageInfoSeries.push(this.infoSeriesDefault[i]);
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
      this.getInfoSeries();

      //console.log('Async operation has ended');
      infiniteScroll.target.complete();
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
