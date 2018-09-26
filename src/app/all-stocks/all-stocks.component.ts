import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { StockService } from '../stock.service';
import { Stock } from '../model/Stock';
import {Router} from '@angular/router';
import * as socketIo from 'socket.io-client';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-all-stocks',
  templateUrl: './all-stocks.component.html',
  styleUrls: ['./all-stocks.component.css']
})
export class AllStocksComponent implements OnInit {

  stocks: Array<Stock> = [];
  private socket;
  timeUntillUpdate: number;
  timeCount:any
  counting: boolean = false;
  
  constructor(private stockService: StockService) {
    this.timeCount = setInterval(() => {});   //initialize timeCount variable
    stockService.loadAllStocks().subscribe(stocks => this.stocks = stocks);
    this.socket = socketIo(environment.serverUrl);
     this.socket.on('stocks-prices-update', (newStocks: Array<Stock>) => {
      clearInterval(this.timeCount);   //clear previous interval if still on
      this.stocks=newStocks;
      this.timeUntillUpdate = 10;
      //start counting
      this.timeCount = setInterval(() => {
        if (this.timeUntillUpdate > 0)
          this.timeUntillUpdate--;
      }, 1000);  
      
     });
    }

  percent(Stock) {
    return ((100 * (Stock.value-Stock.lastValue)) / Stock.lastValue).toFixed(2);
  }

  ngOnInit() {
  }

}
