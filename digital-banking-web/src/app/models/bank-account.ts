import { Customer } from './customer';

export class BankAccount {
  id!: string;
  balance!: number;
  createdAt!: Date;
  customer!: Customer;
}
