import { Component } from '@angular/core';
import { language } from '../entity/language';
import { word } from '../entity/word';
import { storageKeys } from '../entity/storageKeys';
import { Storage } from '@ionic/storage';
import { randomWord } from '../entity/randomWord';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  hiddenFirst = false;
  hiddenSecond = true;
  randomWord: randomWord = new randomWord();
  languages: Array<language> = [];
  words: Array<word> = [];
  quizWords: Array<word> = [];
  currentLangSelection: String;

  constructor(private storageController: Storage) {

  }

  flipCards(){
    this.hiddenFirst = !this.hiddenFirst;
    this.hiddenSecond = !this.hiddenSecond;
  }

  ionSelectOnChange(selectedValue: any) {
    this.currentLangSelection = selectedValue.detail.value;
  }
 

  ionViewDidEnter(){
    this.storageController.get(storageKeys.WORDS_CONSTANT).then((words) => {
      if(words)
       this.words = words;
       console.log(this.words) 
       this.storageController.get(storageKeys.LANGUAGES_CONSTANT).then((langs) => {
        if(langs)
         this.languages = langs;   
         console.log(this.languages) 
         this.pickRandomWord();
      });
    });
  }

  pickRandomWord(){
      this.randomWord = this.words[Math.floor(Math.random() * this.words.length)];
  }
}
