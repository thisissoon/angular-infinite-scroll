import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  list: number[] = [];

  get disabled(): boolean {
    return this.list.length >= 300;
  }

  ngOnInit() {
    this.add20ToArray();
  }

  onScrollEnd() {
    this.add20ToArray();
  }

  add20ToArray() {
    let length = this.list.length;
    for (let i = length; i < length + 20; i++) {
      this.list.push(i + 1);
    }
  }
}
