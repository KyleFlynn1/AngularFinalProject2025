import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stockcalculator',
  imports: [CommonModule],
  templateUrl: './stockcalculator.component.html',
  styleUrl: './stockcalculator.component.css'
})
export class StockcalculatorComponent {
  stockTotalValue: number = 0;
  stockPrice: number = 0;
  stockAmount: number = 0;

  calculateStockValue(price: string, amount: string): void {
    let stockPriceNum = parseFloat(price);
    let stockAmountNum = parseInt(amount);
    this.stockTotalValue = stockPriceNum * stockAmountNum;
    console.log('Total stock value:', this.stockTotalValue);
  }
}
