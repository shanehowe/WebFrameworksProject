import { Component, OnInit } from '@angular/core';
import { Expense, ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-page',
  templateUrl: './expense-page.component.html',
  styleUrls: [],
})
export class ExpensePageComponent implements OnInit {
  total = 0;
  expenses = [] as Expense[];
  maxPurchase = 0;
  food = 0;
  entertainment = 0;
  travel = 0;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses() {
    this.expenseService.getExpenses().subscribe((response) => {
      this.expenses = response.expenses;
      this.total = response.total;
      this.maxPurchase = response.maxPurchase;
      this.food = response.food;
      this.entertainment = response.entertainment;
      this.travel = response.travel;
    });
  }

  logOut() {
    window.location.href = '/api/logout';
  }
}
