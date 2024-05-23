import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';


@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent {

  form = this.formBuilder.group({
    _id:[''],
    name: ['',[Validators.required,
       Validators.minLength(5),
       Validators.maxLength(100)]],
    category: ['',[Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id:course._id,
        name: course.name,
        category: course.category
    });
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
    this.snackBar.open('Curso Salvo', '', { duration: 2000 });
    this.location.back();
  };
  private onError() {
    this.snackBar.open('Erro ao Salvar Curso', '', { duration: 2000 });
  }
  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo Inválido';
  }
}
