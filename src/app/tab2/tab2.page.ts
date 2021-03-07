import { Component } from '@angular/core';
import { storageKeys } from '../entity/storageKeys';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { language } from '../entity/language';
import { word } from '../entity/word';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  languages: Array<language> = [];
  newLanguage: language = new language();
  language: String = null;
  words: Array<word> = [];

  constructor(private storageController: Storage,
    private alertController: AlertController) {
      
    }

  ionViewDidEnter(){
    this.storageController.get(storageKeys.LANGUAGES_CONSTANT).then((val) => {
      if(val)
        this.languages = val; 
    });
  }

  async saveLangAlert(){
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Add new language: ' + this.language,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, 
        {
          text: 'Okay',
          handler: () => {
            if (this.language)
              this.saveLanguage(this.language);
          }
        }
      ]
    });

    await alert.present();
  }  

  async saveLanguage(languageName: String){
    this.storageController.get(storageKeys.LANGUAGES_CONSTANT).then((val) => {
        this.languages = val;
        if(!val)
          this.languages = [];
        this.newLanguage.name = languageName;
        this.languages.push(this.newLanguage)
        this.storageController.set(storageKeys.LANGUAGES_CONSTANT, this.languages);
    });
  }

  async deleteLanguageAlert(languageName: String){
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure to delete ' + languageName + '? All the words will be deleted permanently.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, 
        {
          text: 'Okay',
          handler: () => {
            this.deleteLanguage(languageName);
          }
        }
      ]
    });

    await alert.present();
  } 

  async deleteLanguage(languageName: String){
      this.storageController.get(storageKeys.LANGUAGES_CONSTANT).then((val) => {
        this.languages = val;
        this.languages = this.languages.filter((language) => {return language.name != languageName});
        this.storageController.set(storageKeys.LANGUAGES_CONSTANT, this.languages);

        this.storageController.get(storageKeys.WORDS_CONSTANT).then((words) => {
          this.words = words;
          this.words = this.words.filter((word) => {return word.languageId != languageName});
          this.storageController.set(storageKeys.WORDS_CONSTANT, this.words);
      });
    });
  }
}
