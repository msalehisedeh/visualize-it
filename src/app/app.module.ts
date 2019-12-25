import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { VisualizeItModule } from './visualize-it/visualize-it.module';

import { AppComponent } from './app.component';
import { AppService } from './app.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VisualizeItModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
