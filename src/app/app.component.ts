import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StocklistComponent } from './components/stocklist/stocklist.component';
import { CommonModule } from '@angular/common';
import { StockDataApiService } from './services/stock-data-api.service';
import { StockApiResponse } from './interfaces/stock-api-response';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StocklistComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Stock App Project';
  stockData: any[] = [];
  errorMessage: any;

  constructor(private _stockDataApiService: StockDataApiService) {}

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

  stockListComponent: StocklistComponent | undefined;

  saveStockData(stock: any): boolean {
    if (this.stockListComponent) {
      this.stockListComponent.addStock(
        stock.ticker,
        stock.name,
        stock.price,
        stock.day_change,
        stock.day_low,
        stock.day_high,
        stock.currency,
        stock.mic_code
      );
      return true;
    }
    return false;
  }
}
