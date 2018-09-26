import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockService } from '../stock.service';
import { userStock } from '../model/userStock';
import * as socketIo from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Stock } from '../model/Stock';

@Component({
  selector: 'app-my-stocks',
  templateUrl: './my-stocks.component.html',
  styleUrls: ['./my-stocks.component.css']
})
export class MyStocksComponent implements OnInit {

  stocks: Array<userStock>;
  hasStocks: boolean = false;
  private socket;

  constructor(private stockService: StockService) {
    this.socket = socketIo(environment.serverUrl);
    this.socket.on('stocks-prices-update', (newStocks: Array<Stock>) => 
            this.stocksUpdate(newStocks));
    
    stockService.loadUserStocks().subscribe(stocks => {
      this.stocks = stocks.filter(s => s.amount>0);
      if (this.stocks.length > 0){
        this.hasStocks = true;
      }
      else this.hasStocks = false;
    })
   }

   stocksUpdate(newStocks: Array<Stock>){
     this.stocks.forEach(stk => {
       stk.value = newStocks.find(s => s.name==stk.name).value;
     });
   }

  ngOnInit() {
  }

}
