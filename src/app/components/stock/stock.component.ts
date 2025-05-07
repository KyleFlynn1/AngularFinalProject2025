import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { StockApiService } from '../../services/stock-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock',
  imports: [CommonModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {

  @Input() stock: any;
  
  constructor(private _stockApiService: StockApiService) {}

  deleteStock(stockTicker: string) {
    this._stockApiService.deleteStockDetails(stockTicker).subscribe(result =>
      { 
        console.log('Stock deleted: ' + result) 
      });
  } 
}
