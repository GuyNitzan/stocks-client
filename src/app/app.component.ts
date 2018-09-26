import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { StockService } from './stock.service';
import { BuySellComponent } from './buy-sell/buy-sell.component'
import { ActivatedRoute , Router} from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stocks-app';
  activeLink: string;
  
  constructor(private service:StockService, private activatedRoute: ActivatedRoute,
    private router: Router){
      const tab = window.location.href.substring(22);

      if (tab == 'buy-sell')
        this.activeLink = 'buy-sell';
    
      else if (tab == 'history')
        this.activeLink = 'history';
    
      else if (tab == 'balance')
        this.activeLink = 'balance';

      else
        this.activeLink = 'home';
  }

}
