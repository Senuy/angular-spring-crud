import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { Course } from '../../model/course';
import { Router,ActivatedRoute } from '@angular/router';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';


@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    AppMaterialModule,
    CategoryPipe
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Output() add= new EventEmitter(false)
  @Output() edit= new EventEmitter(false)
  @Output() remove= new EventEmitter(false)


  readonly displayedColumns = ['name', 'category','actions'];


  constructor(){ }
  onAdd(){
    this.add.emit(true);
  }

  onEdit(course: Course){
    this.edit.emit(course);
  }

  onDelete(course: Course){
    this.remove.emit(course);
  }
}

