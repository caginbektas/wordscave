import { Component } from '@angular/core';
import { language } from '../entity/language';
import { word } from '../entity/word';
import { storageKeys } from '../entity/storageKeys';
import { Storage } from '@ionic/storage';
import { stats } from '../entity/stats';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  languages: Array<language> = [];
  words: Array<word> = [];
  stats: Array<stats> = []

  constructor(private storageController:Storage) {}

  ionViewDidEnter(){
    this.storageController.get(storageKeys.WORDS_CONSTANT).then((val) => {
      if(val)
       this.words = val; 
       let items = val;
       let grouped = {};
       for (let item of items) {
         let { languageId } = item;
         if (!(languageId in grouped)) {
           grouped[languageId] = [];
         }
         grouped[languageId].push(item);
       }

        //@ts-ignore
        this.stats = Object.entries(grouped).map(([name, arr]) => ({ name, count: arr.length }));
    });
  }
}
