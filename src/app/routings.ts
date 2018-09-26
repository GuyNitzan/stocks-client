
import { Route } from '@angular/router';
import { MyStocksComponent } from './my-stocks/my-stocks.component';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { HistoryComponent } from './history/history.component';
import { BalanceComponent } from './balance/balance.component';

export const ROUTES: Route[] = [
  {
    path: 'home', component: MyStocksComponent
  },
  {
    path: 'balance', component: BalanceComponent
  },
  {
    path: 'buy-sell/:action/:stock-name', component: BuySellComponent
  },
  {
    path: 'buy-sell', component: BuySellComponent
  },
  {
    path: 'history', component: HistoryComponent
  },
  {
    path: '', pathMatch: 'full', redirectTo: '/home'
  }
];