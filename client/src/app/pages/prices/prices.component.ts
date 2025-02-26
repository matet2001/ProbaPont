import { Component } from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {SalesSectionComponent} from "../../components/sales-section/sales-section.component";
import {ActivatedRoute} from "@angular/router";
import {GlobalService} from "../../services/global/global.service";
import {MatIcon} from "@angular/material/icon";
import {IconComponent} from "../../components/icon/icon.component";

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [
    NgStyle,
    TranslatePipe,
    SalesSectionComponent,
    NgForOf,
    MatIcon,
    NgIf,
    IconComponent
  ],
  templateUrl: './prices.component.html',
  styles: ``
})
export class PricesComponent {
  constructor(public global: GlobalService) {
  }


  getBackgroundImage(): string {
    const fallbackImage = 'assets/images/rooms/Terrarium.webp';
    const imageUrl = "assets/images/price_background.jpg" || fallbackImage;
    return `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)), url(${imageUrl})`;
  }
}
