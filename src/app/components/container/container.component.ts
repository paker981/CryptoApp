import { Component } from '@angular/core';
import { CryptoType } from 'src/app/interfaces/crypto.interface';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {

  protected selectedCrypto!: CryptoType;

  onChange(crytoType: CryptoType){
    this.selectedCrypto = crytoType;
  }
}
