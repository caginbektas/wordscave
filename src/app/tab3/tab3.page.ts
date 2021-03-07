import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { language } from '../entity/language';
import { word } from '../entity/word';
import { storageKeys } from '../entity/storageKeys';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  languages: Array<language> = [];
  words: Array<word> = [];
  newWord: word = new word();
  firstWord: String = null;
  secondWord: String = null
  currentLangSelection: String;
  constructor(private storageController: Storage,
    private alertController: AlertController) {
      
    }

  ionViewDidEnter(){
    this.storageController.get(storageKeys.LANGUAGES_CONSTANT).then((val) => {
      if(val)
        this.languages = val; 
    });
  }

  ionSelectOnChange(selectedValue: any) {
    this.currentLangSelection = selectedValue.detail.value;
  }
 

  async saveWordAlert(){
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Add new word: ' + this.firstWord + '/' + this.secondWord + ' to the language ' + this.currentLangSelection + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, 
        {
          text: 'Okay',
          handler: () => {
            if (this.firstWord && this.secondWord)
              this.saveLanguage(this.firstWord, this.secondWord);
          }
        }
      ]
    });

    await alert.present();
  }  

  async saveLanguage(firstWord: String, secondWord: String){
    this.storageController.get(storageKeys.WORDS_CONSTANT).then((val) => {
        this.words = val;
        if(!val)
          this.words = [];
        this.newWord.first = firstWord;
        this.newWord.second = secondWord;
        this.newWord.languageId = this.currentLangSelection;
        this.words.push(this.newWord);
        this.storageController.set(storageKeys.WORDS_CONSTANT, this.words);

        this.firstWord = null;
        this.secondWord = null;
    });
  }
}
