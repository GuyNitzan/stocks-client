import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { Stock } from '../model/Stock';
import { StockService } from '../stock.service';
import { userStock } from '../model/userStock';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../model/Transaction';
import { Balance } from '../model/Balance';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-buy-sell',
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.css']
})
export class BuySellComponent implements OnInit {

  allStocks: Array<Stock> = [];
  userStocks: Array<userStock> = [];
  bsForm: FormGroup;
  stockName: string;
  action : 'buy';
  t: Transaction;
  withParameters: boolean= false;
  formValid: boolean = false;
  formBuilt: boolean = false;
  balance: number;
  stockValue: number;
  enoughStocks: boolean = true;
  enoughMoney: boolean = true;

  constructor(private stockService: StockService, private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute) {
      stockService.loadBalance().subscribe(b => this.balance=b.value);

      stockService.loadAllStocks().subscribe(x => {
        this.allStocks = x;
        this.getParams();   //get url parameters, if exist
      });
  }

  ngOnInit() {}

  //load the form, initialize default values and set validators
  loadForm() {
    this.bsForm = this.formBuilder.group({
      stock: new FormControl('',Validators.required),
      action: new FormControl('',Validators.required),
      amount: new FormControl('',Validators.compose([this.isValidAmount(this), 
        Validators.required,Validators.min(1)])),
      price: new FormControl('')
    });
    this.bsForm.controls['stock'].setValue(this.stockName);
    this.bsForm.controls['price'].setValue(this.defaultStockValue());
    this.bsForm.controls['price'].disable();
    this.bsForm.controls['action'].setValue(this.action);  
    this.formBuilt = true;
  }

  //check if amount of stocks is valid 
  //validating stock amount for sell and balance for buy 
  isValidAmount(formClass){
    return (control: AbstractControl) => {
      this.enoughMoney = true;
      this.enoughStocks = true;
      if (formClass.action == 'sell'){
        let userStock = this.userStocks.find(s => s.name == formClass.stockName);
        if (!userStock || userStock.amount < control.value){
          this.enoughStocks = false;
          return {'enough-stocks': false};
        }
        return null;
      }
      //action is buy
      else if (formClass.action == 'buy' && this.balance < control.value*formClass.stockValue){
        this.enoughMoney = false;
        return {'enough-balance': false};
      }
      return null;
    };
  }

  //find the stock in the stocks array to get the price
  defaultStockValue() {  
    let stck = this.allStocks.find(x => x.name == this.stockName);
    if (stck){
      this.stockValue = stck.value;
      return stck.value;
    }
  }

  //subscribe for parameters and then load form
  getParams(){
    this.activatedRoute.params.subscribe(params => {
      if (params['stock-name']){
        this.withParameters = true;
        this.stockName = params['stock-name'];
        this.action = params['action'];
      }
      else {
        this.withParameters = false;
      }
      this.stockService.loadUserStocks().subscribe(userStocks => {
        this.userStocks = userStocks;
      });
      this.loadForm();
    });
  }
  
  updateAction(newAction: any){
    this.action = newAction;
  }
  updateStockName(selectedStock: any){
    this.stockName = selectedStock;
    this.loadForm();
  }

  send() {
    this.t = {
    stockName: this.stockName,
    amount: this.bsForm.controls.amount.value,
    price: this.bsForm.controls.price.value,
    type: this.action,
    date: new Date().toLocaleString()
    };
    //add the new transaction to history
    this.stockService.addToHistory(this.t).subscribe(() => {
    });
  
    let balanceChange:number = this.bsForm.controls.amount.value * this.bsForm.controls.price.value;
    let stockChange = this.bsForm.controls.amount.value;

    if (this.action == 'buy'){    //the change to balance is negative
      balanceChange = -balanceChange;
    }
    else {    //action is sell so the change to amount of stock is negative 
      stockChange = -stockChange;
    }

    this.stockService.UpdateBalance(balanceChange).subscribe(() => {
    });
    this.stockService.updateUserStock(this.stockName, stockChange, this.bsForm.controls.price.value).subscribe(()=>{
      alert('Transaction completed succesfully');
    })
  }

}
