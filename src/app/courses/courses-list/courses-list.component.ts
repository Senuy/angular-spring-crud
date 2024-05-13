import { Component, Input } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Course } from '../model/course';
import { Router,ActivatedRoute } from '@angular/router';
import { CategoryPipe } from '../../shared/pipes/category.pipe';


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
  readonly displayedColumns = ['name', 'category','actions'];


  constructor(
    private router:Router,
    private route:ActivatedRoute
  ){ }
  onAdd(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
}

