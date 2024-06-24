import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [AppMaterialModule, CommonModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name,[Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)]],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.rettrieveLessons(course),Validators.required),
    });
   // console.log(this.form);
   // console.log(this.form.value);
  }

  private  rettrieveLessons(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson =>
        lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }
  private createLesson(lesson : Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name,[Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)]],
    });
  }
    getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

    addNewLesson() {
      const Lessons = this.form.get('lessons') as UntypedFormArray;
      Lessons.push(this.createLesson());
  }

  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit() {
    if(this.form.valid){
      this.service.save(this.form.value).subscribe({
        next: (result) => this.onSuccess(),
        error: () => this.onError()});
    }else{
      alert('Formulario Invalido');
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Curso Salvo', '', { duration: 2000 });
    this.location.back();
  }
  private onError() {
    this.snackBar.open('Erro ao Salvar Curso', '', { duration: 2000 });
  }
  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    const erros = this.form.getError(fieldName);

    if (field?.hasError('required')) {
      return 'Campo Obrigatório';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = erros ? erros['requiredlength'] : 5;
      return `Tamanho MÍNIMO precisa ser de ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = erros ? erros['requiredlength'] : 50;
      return `Tamanho MÁXIMO é de ${requiredLength} caracteres`;
    }

    return 'Campo Inválido.';
  }

  isFormArrayRequired(){
    const lessons = this.form.get('lessons') as UntypedFormArray;
    return !lessons.valid && lessons.hasError('required') && lessons.touched;
  }
}
