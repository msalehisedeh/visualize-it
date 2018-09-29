import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualizeItComponent } from './components/visualize-it.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    VisualizeItComponent
  ],
  exports: [
    VisualizeItComponent
  ],
  entryComponents: [
    VisualizeItComponent
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class VisualizeItModule {}
