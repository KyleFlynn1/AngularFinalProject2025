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
  sortedStocksData: any[] = [];
  tickerOptions = new Set<string>();
  show : boolean = false;

  constructor(private _stockApiService: StockApiService) {}

  ngOnInit() {
      this.getStocks(); 
    }

    getStocks() {
      this._stockApiService.getStockDetails().subscribe((stocksData) => {
        console.log('API Response:', stocksData); 
        if (Array.isArray(stocksData))
           {
          this.stocksData = stocksData; 
          this.getTickerOptions();
        } 
        else 
        {
          console.error('Error getting stockss data:', stocksData);
          this.stocksData = []; 
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
      console.log('Stock added:', stocksData);
      this.stocksData = stocksData;
    });
    return false;
  }

  filterStockHistory(ticker: string) {
    this._stockApiService.getStockDetailsByTicker(ticker).subscribe((sortedStocksData) => {
      console.log('API Response:', sortedStocksData); 
      if (Array.isArray(sortedStocksData)) {
        this.sortedStocksData = sortedStocksData; 
        console.log('Stock data filtered:', this.stocksData);
      } 
      else 
      {
        console.error('Error getting stocks', sortedStocksData);
        this.sortedStocksData = []; 
      }
    });
  }

  getTickerOptions() {
    this.stocksData.forEach(stock => {
      this.tickerOptions.add(stock.ticker);
      console.log('stock ticker added to set:', this.tickerOptions);
    });
  }

  refreshStock() {
    this.getStocks();
  }
}
