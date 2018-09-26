import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Stock } from './model/Stock';
import { userStock } from './model/userStock';
import { Transaction } from './model/Transaction';
import { environment } from '../environments/environment';
import { Balance } from './model/Balance';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  
  updateUserStock(stockName: string, amount: number, price: number) {
    const url = environment.serverUrl + '/update-stock/' + stockName;
    return this.http.put(url, {amount, price});
  }

  addToHistory(t: Transaction) {
    const url = environment.serverUrl + '/transaction';
    return this.http.post<any>(url, t);
  }

  loadAllStocks(): Observable<Array<Stock>> {
    const url = environment.serverUrl + '/all-stocks';
    return this.http.get<Array<Stock>>(url);
  }

  loadUserStocks(): Observable<Array<userStock>> {
    const url = environment.serverUrl + '/user-stocks';
    return this.http.get<Array<userStock>>(url);
  }

  loadHistory(): Observable<Array<Transaction>> {
    const url = environment.serverUrl + '/history';
    return this.http.get<Array<Transaction>>(url);
  }

  loadBalance(): Observable<Balance> {
    const url = environment.serverUrl + '/balance';
    return this.http.get<Balance>(url);
  }

  UpdateBalance(change: number) {
    const url = environment.serverUrl + '/new-balance';
    return this.http.put<any>(url, {change});
  }
  
  constructor(private http: HttpClient) {
  }
}
