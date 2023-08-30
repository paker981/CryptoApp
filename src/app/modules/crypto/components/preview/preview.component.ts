import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, combineLatest, delay, first, interval, map, merge, mergeWith, of, pluck, repeat, startWith, switchMap, takeUntil, tap, timer } from 'rxjs';
import { CryptoType, MarketStatsResponse } from 'src/app/interfaces/crypto.interface';
import { CryptoDataService } from 'src/app/services/crypto-data.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  // on push
})
export class PreviewComponent {
  protected data$: Observable<MarketStatsResponse>;
  private selectedCrypto$ = new BehaviorSubject<CryptoType>(CryptoType.BTC);
  private refreshCryptoData$ = new Subject<void>();
  private baseInterval$ = interval(10000).pipe(
      takeUntil(this.refreshCryptoData$),
      repeat()
  )
  
      
  @Input({required: true}) set selectedCrypto (value: CryptoType){
    this.onSelectCrypto(value)
  } 

  constructor(private cryptoService: CryptoDataService) {
    
    this.data$ = 
        merge(this.refreshCryptoData$,this.baseInterval$)
          .pipe(
            switchMap(() => this.getDataFromService()
          ))
  }

  private getDataFromService(){
    return this.cryptoService.getData(this.selectedCrypto$.getValue()).pipe(
      map(data => data[0]), 
      tap((res)=> console.log(res)),
      catchError((err)=>of({} as MarketStatsResponse))
    );
  }

  onBuyCrypto(crypto: MarketStatsResponse): void {
    console.log(`Bought ${crypto.name} for ${crypto.price}`);
  }

  onResetInterval(): void {
    this.refreshCryptoData$.next();
  }

  private onSelectCrypto(crypto: CryptoType): void {
    this.selectedCrypto$.next(crypto);
    this.refreshCryptoData$.next();
  }
}
