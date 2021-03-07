import { Component } from '@angular/core';
import { storageKeys } from '../entity/storageKeys';
import { Storage } from '@ionic/storage';
import { language } from '../entity/language';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  languages: Array<language> = [];
  newLanguage: language = null;

  constructor(private storageController: Storage) {}

  saveLanguage(languageName: String){
    this.storageController.get(storageKeys.LANGUAGES_CONSTANT).then((val) => {
      if(val)
        this.languages = val;
        this.newLanguage.name = languageName;
        this.languages.push(this.newLanguage)
        this.storageController.set(storageKeys.LANGUAGES_CONSTANT, this.languages);
    });
  }

  getLanguages(){
    this.storageController.get(storageKeys.LANGUAGES_CONSTANT).then((val) => {
      if(val)
        this.languages = val; 
    });
  }
}
