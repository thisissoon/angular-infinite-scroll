import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from '@thisissoon/angular-infinite-scroll';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [BrowserModule, InfiniteScrollModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
