import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { StockApiResponse } from '../interfaces/stock-api-response';

@Injectable({
  providedIn: 'root'
})
export class StockDataApiService {
  private _siteURL = 'https://api.stockdata.org/v1/data/quote?symbols=';
  private _key = '&api_token=TRj09yO7mRpxni1hrGqf2UgCdfRXlLVRMnAWG0lf';
  constructor(private _http: HttpClient) { }

  getStockData(stockSymbol:string):Observable<StockApiResponse> {
    const url = `${this._siteURL}${stockSymbol}${this._key}`;
    return this._http.get<StockApiResponse>(url)
      .pipe(
        tap(data => console.log('Stock data: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    console.log('StockDataApiService Error: ' + err.message);
    return throwError(() => new Error('StockDataApiService Error: ' + err.message));
  }
}
