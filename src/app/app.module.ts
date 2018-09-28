import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { visualizeItModule } from './visualize-it/visualize-it.module';

import { AppComponent } from './app.component';
import { AppService } from './app.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    visualizeItModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
