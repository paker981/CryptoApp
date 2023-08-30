import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CryptoType, MarketStatsResponse } from '../interfaces/crypto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoDataService {
  private readonly apiUrl = 'https://api.minerstat.com/v2/coins';

  constructor(private http: HttpClient) { }

  getData(symbol: CryptoType): Observable<MarketStatsResponse[]> {

    const params = new HttpParams().set('list', symbol);
     const headers = new HttpHeaders()
      .set('X-RapidAPI-Key', '3fd254c56cmshdfe36f181550045p17fdb6jsnddfe59d5809f')
      .set('X-RapidAPI-Host', 'mineable-coins.p.rapidapi.com');

    return this.http.get<MarketStatsResponse[]>(this.apiUrl, { headers, params });
  }
}