import { Component } from '@angular/core';
import { StockDataApiService } from '../../services/stock-data-api.service';
import { StockApiResponse } from '../../interfaces/stock-api-response';
import { IStock, NewStock } from '../../interfaces/stock';
import { StockApiService } from '../../services/stock-api.service';;
import { CommonModule } from '@angular/common';
import { StockComponent } from '../stock/stock.component';

@Component({
  selector: 'app-search',
  imports: [CommonModule, StockComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  stockData: any[] = [];
  stockDataHistory: any[] = [];
  errorMessage: any;
  constructor(private _stockDataApiService: StockDataApiService, private _stockAPIService : StockApiService) {}

  getStockData(stockSymbol: string): boolean {
    this._stockDataApiService.getStockData(stockSymbol).subscribe({
      next: stockData => {
        if (stockData && stockData.data) {
          if (Array.isArray(stockData.data) && stockData.data.length > 0) {
            this.stockData = stockData.data;
            console.log('Stock data: ', this.stockData);
          } else {
            console.error('No stock data found');
          }
        } else {
          console.error('Invalid stock data response');
        }
      },
      error: error => {
        this.errorMessage = error;
        console.error('Error fetching stock data: ', error);
      }
    });
    return false;
  }

  saveStock(stock: StockApiResponse): boolean {
    console.log('Adding stock:', stock.ticker, stock.name, stock.price, stock.day_change, stock.day_low, stock.day_high, stock.currency, stock.mic_code);
    const addStock: IStock = new NewStock(
      stock.ticker,
      stock.name,
      Number(stock.price),
      Number(stock.day_change),
      Number(stock.day_low),
      Number(stock.day_high),
      stock.currency,
      stock.mic_code
    );
    this._stockAPIService.addStockDetails(addStock).subscribe(stocksData => {
      console.log('Stock added:', stocksData);
    });
    return false;
  }

  getStockHistory(ticker: string) {
    this._stockAPIService.getStockDetailsByTicker(ticker).subscribe((stocksData) => {
      console.log('API Response:', stocksData); // Log the response
      if (Array.isArray(stocksData)) {
        this.stockDataHistory = stocksData; // Assign only if it's an array
      } else {
        console.error('Expected an array but got:', stocksData);
        this.stockDataHistory = []; // Fallback to an empty array
      }
    });
  }
}
