import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{
  public payments:any;
  public dataSource:any;
  public displayedColumns=['id','date','amount','type','status','firstName'];
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private studentsService:StudentsService) {

  }

  ngOnInit() {
    this.studentsService.getAllPayments().subscribe({
      next:value=>{
    this.payments=value;
    this.dataSource=new MatTableDataSource(this.payments);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
    },
      error: err => {
        console.log(err);
      }
    })
  }
}
