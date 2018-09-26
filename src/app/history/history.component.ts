import { Component, OnInit } from '@angular/core';
import { Transaction } from '../model/Transaction';
import { Observable, BehaviorSubject } from 'rxjs';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history: Array<Transaction>;
  hasTransactions: boolean = false;

  constructor(private stockService: StockService) {
    stockService.loadHistory().subscribe(h => {
      this.history = h;
      if (this.history.length > 0)
        this.hasTransactions = true;
      else this.hasTransactions = false;
    });
   }

  ngOnInit() {
  }

}
