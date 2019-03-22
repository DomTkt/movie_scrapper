import { FavoriteMedia } from './../../models/favoriteMedia';
import { MediaId } from './../../models/mediaId';
import { Platform, AlertController, ActionSheetController } from '@ionic/angular';
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

  favoriteMedias: MediaId[] = [];
  favoriteMediasCSVTab : FavoriteMedia[] = [];
  id: string;

  constructor(
    private favoriteService: FavoriteService, private router: Router, private file: File, private platform: Platform, private fileChooser: FileChooser, private alertController: AlertController, private actionSheetController: ActionSheetController) { }


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
      alert('Your favorites are exports in files favorites' +  Date.now().toString()+ '.json in your app folder')
      this.file.writeFile(this.file.externalDataDirectory, 'favorites'+Date.now().toString()+'.json', JSON.stringify(this.favoriteMedias), { replace: true });
    }
    else {
      alert("Connect a mobile device Android to export your favorite")
    }
  }

  writeCSVInFile() {

    for(let i = 0 ; i < this.favoriteMedias.length ; i++){
      let favoriteMediaCSV = new FavoriteMedia(this.favoriteMedias[i].Title, this.favoriteMedias[i].Released, this.favoriteMedias[i].imdbVotes)
      this.favoriteMediasCSVTab.push(favoriteMediaCSV)
    }

    if (this.platform.is("android")) {
      alert('Your favorites are exports in files favorites' +  Date.now().toString()+ '.csv in your app folder')
      this.file.writeFile(this.file.externalDataDirectory, 'favorites'+Date.now().toString()+'.csv', this.convertObjectToCSV(this.favoriteMediasCSVTab), { replace: true });
    }
    else {
      alert("Connect a mobile device Android to export your favorite")
    }
  }

  convertObjectToCSV(objArray) {    
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = ""; 
    for (let index in objArray[0]) {
        row += index + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line != '') line += ',';
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
}

CSVToJsonConvertor(csvFile: string) {
  let array = this.CSVToArray(csvFile, ",");
  let objArray = [];
  for (let i = 1; i < array.length - 1; i++) {
      objArray[i - 1] = {};
      for (let k = 0; k < array[0].length && k < array[i].length; k++) {
          let key = array[0][k];
          objArray[i - 1][key] = array[i][k]
      }
  }
  let json: string = JSON.stringify(objArray);
  let str: string = json.replace(/},/g, "},\r\n");
  return str;
}

CSVToArray(strData: string, strDelimiter: string) {
  strDelimiter = (strDelimiter || ",");
  let objPattern: RegExp = new RegExp((
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
  let arrData = [[]];
  let arrMatches = null;
  while (arrMatches = objPattern.exec(strData)) {
      let strMatchedDelimiter = arrMatches[1];
      if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
          arrData.push([]);
      }
      if (arrMatches[2]) {
          var strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
      } else {
          var strMatchedValue = arrMatches[3];
      }
      arrData[arrData.length - 1].push(strMatchedValue);
  }
  return (arrData);
}

  readJsonFromFile() {
    if (this.platform.is("android")) {
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

    }else{
      alert("Connect a mobile device Android to export your favorite")
    }
  }

  readCSVFromFile() {
    if (this.platform.is("android")) {
    let filePathWithoutFileName: string;
    this.fileChooser.open()
      .then(uri => {
        this.file.resolveLocalFilesystemUrl(uri.toString())
          .then(fileName => {
            filePathWithoutFileName = uri.toString().replace(fileName.name.toString(), "");
            this.file.readAsText(filePathWithoutFileName, fileName.name)
              .then(data => {
                this.favoriteMedias = JSON.parse(this.CSVToJsonConvertor(data))
                for (let i = 0; i < this.favoriteMedias.length; i++) {
                  this.favoriteService.addFavoriteMedia(this.favoriteMedias[i]);
                }
              })
              .catch((error) => { console.log('Error when reading CSV file', error) });
          }).catch((error) => { console.log('Error when get the path of the file selected', error) });
      }).catch((error) => { console.log('Error when open file chooser', error) });

    }else{
      alert("Connect a mobile device Android to export your favorite")
    }
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

  async presentActionSheetExportCSV() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Export CSV File',
      buttons: [{
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      },{
        text: 'Save your favorite in CSV file in your device',
        icon: 'heart',
        handler: () => {
          this.writeCSVInFile()
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentActionSheetExportJSON() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Export JSON File',
      buttons: [{
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      },{
        text: 'Save your favorite in Json file in your device',
        icon: 'heart',
        handler: () => {
          this.writeJsonInFile()
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentActionSheetExport() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Export file in',
      buttons: [{
        text: 'JSon File',
        icon: 'download',
        handler: () => {
          this.presentActionSheetExportJSON()
        }
      },{
        text: 'CSV File',
        icon: 'download',
        handler: () => {
          this.presentActionSheetExportCSV()
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentActionSheetImport() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Import',
      buttons: [{
        text: 'JSon File',
        icon: 'folder',
        handler: () => {
          this.readJsonFromFile()
        }
      },{
        text: 'CSV File',
        icon: 'folder',
        handler: () => {
          this.readCSVFromFile()
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  ionRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.ionViewWillEnter()
      event.target.complete();
    }, 1000);
  }
}