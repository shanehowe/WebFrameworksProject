import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface Expense {
  _id: string;
  name: string;
  amount: number;
  category: string;
}

export interface ExpensesResponse {
  expenses: Expense[];
  maxPurchase: number;
  total: number;
  food: number;
  entertainment: number;
  travel: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expenseResponse: ExpensesResponse = {
    expenses: [],
    maxPurchase: 0,
    total: 0,
    food: 0,
    entertainment: 0,
    travel: 0,
  };
  constructor(private readonly httpClient: HttpClient) {}

  fetchExpenses() {
    return this.httpClient.get<ExpensesResponse>('/api/expense').pipe(
      tap((response) => {
        this.expenseResponse = response;
      })
    );
  }

  getExpenses() {
    return this.fetchExpenses();
  }
}
