import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounce, debounceTime, defaultIfEmpty } from 'rxjs';
import { CryptoType } from 'src/app/interfaces/crypto.interface';

@UntilDestroy()
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {

  @Output() cryptoChanged = new EventEmitter<CryptoType>();
  protected cryptocurrencies = CryptoType;
  protected form: FormControl<CryptoType>;

  constructor(){
    this.form = new FormControl(CryptoType.BTC) as FormControl<CryptoType>
    this.cryptoChanged.emit(this.form.value);

    this.form.valueChanges.pipe(
      debounceTime(400),
      untilDestroyed(this)
    ).subscribe((val)=>this.cryptoChanged.emit(val))
  }
}
