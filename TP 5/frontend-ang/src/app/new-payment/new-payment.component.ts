import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentType} from "../model/students.model";
import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{
 paymentFormGroup! : FormGroup;
 studentCode!:string;
  paymentType:string[]=[];
  pdfFileUrl!:string;
  showProgress:boolean=false;
  constructor(
    private fb:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private studentService:StudentsService) {
  }

  ngOnInit() {
    for(let elt in PaymentType){
      if(typeof PaymentType[elt]=="string"){
        this.paymentType.push(PaymentType[elt]);
      }

    }
    this.studentCode=this.activatedRoute.snapshot.params['studentCode'];
    this.paymentFormGroup=this.fb.group({
      date:this.fb.control(''),
      amount:this.fb.control(''),
      type:this.fb.control(''),
      studentCode:this.fb.control(this.studentCode),
      fileSource:this.fb.control(''),
      fileName:this.fb.control(''),
    });

  }

  selectFile(event: any) {
  if(event.target.files.length>0){
    let file=event.target.files[0];
    this.paymentFormGroup.patchValue({
      fileSource:file,
      fileName:file.name
    });
    this.pdfFileUrl=window.URL.createObjectURL(file);
  }
  }

  savePayment() {
    this.showProgress=true;
    let date=new Date(this.paymentFormGroup.value.date);
    let formattedDate=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    //this.showProgress=true;
    const formData=new FormData();
    console.log(formattedDate);
    formData.append('file',this.paymentFormGroup.get('fileSource')!.value);
    formData.append("amount",this.paymentFormGroup.value.amount);
    formData.append("type",this.paymentFormGroup.value.type);
    formData.append('date',formattedDate);
    formData.append('studentCode',this.paymentFormGroup.value.studentCode);

    this.studentService.savePayment(formData).subscribe({
      next:date=>{
        this.showProgress=false;
          alert("Payment Saved successfully")
      },
      error:err => {
        console.log(err);
      }
    });
  }

  afterLoadComplete($event: any) {
    console.log(event);
  }
}
