import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {StudentsService} from "../services/students.service";
import {Router} from "@angular/router";
import {Student} from "../model/students.model";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  public students:any;
  public dataSource:any;
  public displayedColumns=['id','firstName','lastName','code','programeId','actions'];
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private studentsService:StudentsService,private router:Router) {

  }

  ngOnInit() {
    this.studentsService.getStudents().subscribe({
      next:value=>{
        this.students=value;
        this.dataSource=new MatTableDataSource(this.students);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  studentPayments(student:Student){
    this.router.navigateByUrl(`/admin/student-details/${student.code}`);
  }
}
