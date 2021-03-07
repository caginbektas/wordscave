import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  hiddenFirst = false;
  hiddenSecond = true;

  constructor() {}

  flipCards(){
    this.hiddenFirst = !this.hiddenFirst;
    this.hiddenSecond = !this.hiddenSecond;
  }
}
