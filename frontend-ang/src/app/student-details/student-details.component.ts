import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../services/students.service";
import {Payment} from "../model/students.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{
  studentCode!:string;
  studentPayments!:Array<Payment>;
  paymentsDataSource!:MatTableDataSource<Payment>;
  public displayedColumns=['id','date','amount','type','status','firstName','details'];
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private activatedRoute:ActivatedRoute,private studentService:StudentsService,private router:Router) {
}
  ngOnInit() {
  this.studentCode=this.activatedRoute.snapshot.params['code'];
  this.studentService.getStudentPayments(this.studentCode).subscribe({
    next:data=>{
      this.studentPayments=data;
      this.paymentsDataSource=new MatTableDataSource<Payment>(this.studentPayments);
      this.paymentsDataSource.paginator=this.paginator;
      this.paymentsDataSource.sort=this.sort;
    },
    error:err => {
      console.log(err);
    }
  })
  }

  newPayment() {
    this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`);
  }

  paymentDetails(element:any) {
    this.router.navigateByUrl(`/admin/payment-details/${element.id}`);
  }
}
