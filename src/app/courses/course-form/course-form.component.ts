import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';


@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent {
  form = this.formBuilder.group({
    name: [''],
    category: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
  ) {

  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (data) => this.onSuccess(),
      error: () => {
        this.onError();
      },
    });
  }

  onCancel() {
    this.location.back();

  }

  private onSuccess(){
    this.snackBar.open('Curso Salvo', '', { duration: 5000 });
    this.location.back();
  };
  private onError() {
    this.snackBar.open('Erro ao Salvar Curso', '', { duration: 5000 });
  }
}
