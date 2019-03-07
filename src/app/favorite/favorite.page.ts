import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx'
import { FavoriteService } from './../favoriteService/favorite.service';
import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage {

  favoriteMedias: any[] = [];
  id: string;

  constructor(
    private favoriteService: FavoriteService, private router: Router, private file: File, private platform: Platform, private fileChooser: FileChooser, private alertController: AlertController) { }


  ionViewWillEnter() {
    this.favoriteMedias = [];
    this.initFavoriteMovies();
  }

  private initFavoriteMovies() {
    this.favoriteService
      .getFavoriteMedias()
      .then(favs => (this.favoriteMedias = favs));
  }

  goToDetail(media: any) {
    this.id = media.imdbID;
    this.router.navigateByUrl('/details/' + this.id)
  }

  writeJsonInFile() {
    if (this.platform.is("android")) {
      alert("Your favorites are exports in files favorites.json in your app folder")
      this.file.writeFile(this.file.externalDataDirectory, 'favorites.json', JSON.stringify(this.favoriteMedias), { replace: true });
    }
    else {
      alert("Connect a mobile device Android to export your favorite")
    }
  }


  readJsonFromFile() {
    let filePathWithoutFileName: string;
    this.fileChooser.open()
      .then(uri => {
        this.file.resolveLocalFilesystemUrl(uri.toString())
          .then(fileName => {
            filePathWithoutFileName = uri.toString().replace(fileName.name.toString(), "");
            this.file.readAsText(filePathWithoutFileName, fileName.name)
              .then(data => {
                this.favoriteMedias = JSON.parse(data)
                for (let i = 0; i < this.favoriteMedias.length; i++) {
                  this.favoriteService.addFavoriteMedia(this.favoriteMedias[i]);
                }
              })
              .catch((error) => { console.log('Error when reading Json file', error) });
          }).catch((error) => { console.log('Error when get the path of the file selected', error) });
      }).catch((error) => { console.log('Error when open file chooser', error) });

  }
  async presentAlert(headerAlert: string, subHeaderAlert: string, messageAlert: string) {

    const alert = await this.alertController.create({
      header: headerAlert,
      subHeader: subHeaderAlert,
      message: messageAlert,
      buttons: ['OK']
    });
    return await alert.present();
  }

  ionRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.ionViewWillEnter()
      event.target.complete();
    }, 1000);
  }
}