import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { InfiniteScrollModule } from './infinite-scroll';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
