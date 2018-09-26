import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { AppComponent } from './app.component';
import { AllStocksComponent } from './all-stocks/all-stocks.component';
import { MyStocksComponent } from './my-stocks/my-stocks.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import {  RouterModule } from '@angular/router';
import { ROUTES } from '../app/routings';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HistoryComponent } from './history/history.component';
import { BalanceComponent } from './balance/balance.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule, MatNativeDateModule, MatInputModule, MatOptionModule
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    AllStocksComponent,
    MyStocksComponent,
    BuySellComponent,
    HistoryComponent,
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    BrowserModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
  ],
  providers: [BuySellComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
