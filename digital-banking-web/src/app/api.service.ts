import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './models/customer';
import { BankAccount } from './models/bank-account';
import { AccountOperation } from './models/account';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) {}

  loadOperationCounts(): Observable<{ CREDIT: number; DEBIT: number }> {
    return this.http.get<{ CREDIT: number; DEBIT: number }>(
      `${this.baseUrl}/operations/counts`
    );
  }

  getOperationCountsByCustomer(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(
      `${this.baseUrl}/operations/customer-counts`
    );
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/customers`);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/customers/${id}`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/customers`, customer);
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/customers/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/customers/${id}`);
  }

  // BankAccount methods
  getBankAccounts(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(`${this.baseUrl}/accounts`);
  }

  getBankAccount(id: string): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${this.baseUrl}/accounts/${id}`);
  }

  addBankAccount(account: BankAccount): Observable<BankAccount> {
    return this.http.post<BankAccount>(`${this.baseUrl}/accounts`, account);
  }

  updateBankAccount(id: string, account: BankAccount): Observable<BankAccount> {
    return this.http.put<BankAccount>(
      `${this.baseUrl}/accounts/${id}`,
      account
    );
  }

  searchCustomers(
    keyword: string,
    page: number,
    size: number
  ): Observable<Page<Customer>> {
    return this.http.get<Page<Customer>>(`${this.baseUrl}/customers/search`, {
      params: {
        keyword,
        page: page.toString(),
        size: size.toString(),
      },
    });
  }

  searchBankAccounts(
    keyword: string,
    page: number,
    size: number
  ): Observable<Page<BankAccount>> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<BankAccount>>(`${this.baseUrl}/accounts/search`, {
      params,
    });
  }

  deleteBankAccount(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/accounts/${id}`);
  }

  getAccountOperations(accountId: string): Observable<AccountOperation[]> {
    return this.http.get<AccountOperation[]>(
      `${this.baseUrl}/accounts/${accountId}/operations`
    );
  }

  addAccountOperation(
    accountId: string,
    operation: AccountOperation
  ): Observable<AccountOperation> {
    return this.http.post<AccountOperation>(
      `${this.baseUrl}/accounts/${accountId}/operations`,
      operation
    );
  }
}

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
