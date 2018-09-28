import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { visualizeItComponent } from './components/visualize-it.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    visualizeItComponent
  ],
  exports: [
    visualizeItComponent
  ],
  entryComponents: [
    visualizeItComponent
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class visualizeItModule {}
