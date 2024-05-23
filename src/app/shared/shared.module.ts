import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmationDialogComponent } from '../courses/components/courses-list/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [],
  imports: [
    ErrorDialogComponent,
    CommonModule,
    AppMaterialModule,
    CategoryPipe,
    ConfirmationDialogComponent
  ],
  exports: [
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    CategoryPipe,
  ]
})
export class SharedModule { }
