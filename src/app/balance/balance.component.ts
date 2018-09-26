const initialBalance: number = 1000;
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { StockService } from '../stock.service';
import { Balance } from '../model/Balance';
import { BuySellComponent } from '../buy-sell/buy-sell.component'
import { userStock } from '../model/userStock';
import { Transaction } from '../model/Transaction';
import { environment } from '../../environments/environment';
import { Stock } from '../model/Stock';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
  providers: [ BuySellComponent ]
})
export class BalanceComponent implements OnInit {

  balance: number;
  gainMessage: string = 'you earned ';
  delta: number;
  button: string = 'more details';
  showDetails: boolean = false;
  stocks: Array<userStock>;
  hasStocks: boolean;
  history: Array<Transaction>;
  private socket;

  constructor(private stockService: StockService, private buySell: BuySellComponent) {
    this.loadBalance();
    this.socket = socketIo(environment.serverUrl);
    this.socket.on('stocks-prices-update', (newStocks: Array<Stock>) => 
      this.stocksUpdate(newStocks));
  }

  //changes the 'more details' option
  toggleDetails(){
    this.showDetails = !this.showDetails;
    if (this.button == 'more details')
      this.button = 'hide details';
    else this.button = 'more details';
  }

  //calculates the total gain/loss for a specific user stock
  calcGain(stk: userStock): number{
    let gain = 0;
      this.history
      .filter(t => t.stockName == stk.name)
      .forEach(transaction => {
        let change = transaction.amount*transaction.price;
        if (transaction.type == 'buy')
          change = -change;

        gain += change;
      });
    
    return gain;
  }

  //subscribe for balance changes and update total gain/loss
  loadBalance(){
    this.stockService.loadBalance().subscribe(currentBalance => {
      this.balance = currentBalance.value;

      if (this.balance >= initialBalance){
        this.gainMessage = 'you earned ';
        this.delta = this.balance-initialBalance;
      }
      else {
        this.gainMessage = 'you lost ';
        this.delta = initialBalance-this.balance;
      }
      this.loadUserStocks();
    });
  }

  loadUserStocks(){
    this.stockService.loadUserStocks().subscribe(stocks => {
      this.stocks = stocks.filter(s => s.amount>0);
      if (this.stocks.length > 0){
        this.hasStocks = true;
      }
      else this.hasStocks = false;

      this.stockService.loadHistory().subscribe(h => this.history = h);
    });
  }

  //update existing user-stocks after stocks update
  stocksUpdate(newStocks: Array<Stock>){
    this.stocks.forEach(stk => {
      stk.value = newStocks.find(s => s.name==stk.name).value;
    });
  }

  ngOnInit() {
  }

}
