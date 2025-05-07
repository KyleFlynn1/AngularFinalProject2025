import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockApiService } from '../../services/stock-api.service';
import { IStock, NewStock } from '../../interfaces/stock';
import { StockComponent } from '../stock/stock.component';

@Component({
  selector: 'app-stocklist',
  imports: [CommonModule, StockComponent],
  templateUrl: './stocklist.component.html',
  styleUrl: './stocklist.component.css'
})
export class StocklistComponent {
  stocksData: any[] = [];
  show : boolean = false;

  constructor(private _stockApiService: StockApiService) {}

  ngOnInit() {
      this.getStocks(); 
    }

    getStocks() {
      this._stockApiService.getStockDetails().subscribe((stocksData) => {
        console.log('API Response:', stocksData); // Log the response
        if (Array.isArray(stocksData)) {
          this.stocksData = stocksData; // Assign only if it's an array
        } else {
          console.error('Expected an array but got:', stocksData);
          this.stocksData = []; // Fallback to an empty array
        }
      });
    }

  addStock(ticker: string, name: string, price: string, change: string, day_low: string, day_high: string, currency: string, mic_code: string) {
    console.log('Adding stock:', ticker, name, price, change, day_low, day_high, currency, mic_code);
    const addStock: IStock = new NewStock(
      ticker,
      name,
      Number(price),
      Number(change),
      Number(day_low),
      Number(day_high),
      currency,
      mic_code
    );
    this._stockApiService.addStockDetails(addStock).subscribe(stocksData => {
      this.stocksData = stocksData;
    });
    return false;
  }
}
