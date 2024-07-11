import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Payment, Student} from "../model/students.model";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpClient) { }
  public getAllPayments():Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`http://localhost:8021/payments`);
  }
  public getStudents():Observable<Array<Student>>{
    return this.http.get<Array<Student>>(`http://localhost:8021/students`);
  }
  public getStudentPayments(code:string):Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`http://localhost:8021/students/${code}/payments`);
  }
  public savePayment(formData:any):Observable<Payment>{
    return this.http.post<Payment>(`http://localhost:8021/payments`,formData);
  }

  getPaymentDetails(paymentId: number) {
    return this.http.get(`http://localhost:8021/paymentFile/${paymentId}`,{responseType:'blob'});
  }
}
