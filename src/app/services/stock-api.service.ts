import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap  } from 'rxjs';
import { IStock } from '../interfaces/stock';

@Injectable({
  providedIn: 'root'
})
export class StockApiService {

  constructor(private _http: HttpClient) {}
  private _siteURL = 'http://localhost:5050/stocks/';


  getStockDetails():Observable<any> {
    return this._http.get<IStock>(this._siteURL)
    .pipe(
      tap(data => console.log('stock data/error: ' + JSON.stringify(data))
    ),
    catchError(this.handleError)
    );
  }

  getStockDetailsByTicker(stockTicker:string):Observable<any> {
    return this._http.get<IStock>(this._siteURL+'/'+stockTicker)
    .pipe(
      tap(data => console.log('stock data/error: ' + JSON.stringify(data))
    ),
    catchError(this.handleError)
    );
  }

  addStockDetails(stock: IStock):Observable<any> {
    return this._http.post<IStock>(this._siteURL, stock)
    .pipe(
      tap(data => console.log('add stock/error: ' + JSON.stringify(data))
    ),
    catchError(this.handleError)
    );
  }

  deleteStockDetails(stockTicker:string):Observable<any>{
    let deleteURL = this._siteURL+"/"+stockTicker;
    return this._http.delete(deleteURL)
    .pipe(
      tap(data => console.log('delete stock/error: ' + JSON.stringify(data))
    ),
    catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    console.log('StockAPIService Error: ' + err.message);
    return err.message;
  }
    
}
