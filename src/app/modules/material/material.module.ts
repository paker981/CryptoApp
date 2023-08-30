import { NgModule } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [],
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule

  ],
  exports: [
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule
  ]

})
export class MaterialModule { }
