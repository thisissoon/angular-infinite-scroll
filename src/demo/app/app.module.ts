import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule  } from "@angular/common";
import { InfiniteScrollModule } from 'angular-infinite-scroll';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [BrowserModule, CommonModule, InfiniteScrollModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
