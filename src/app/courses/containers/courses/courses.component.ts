import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    AppMaterialModule,
    NgIf,
    CommonModule,
    CategoryPipe,
    CoursesListComponent

  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  courses$: Observable<Course[]>;
  //courses: course[] = []

  //coursesService: CoursesService;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router:Router,
    private route:ActivatedRoute
  ) {
    //this.coursesService = new CoursesService();
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError(' Erro ao carregar Cursos ');
        return of([]);
      })
    );
  }

  onError(erroMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: erroMsg,
    });
  }
  onAdd(){

    this.router.navigate(['new'],{relativeTo:this.route});

  }
  onEdit(course : Course){

    this.router.navigate(['edit',course._id],{relativeTo:this.route});

  }

}
