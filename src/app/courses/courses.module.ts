import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesService } from './services/courses.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppMaterialModule,
    CoursesRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers:[
    CoursesService
  ],
})
export class CoursesModule { }
