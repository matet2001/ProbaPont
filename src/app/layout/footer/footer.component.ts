import { Component } from '@angular/core';
import {LogoComponent} from "../../shared/atoms/logo/logo.component";
import {TranslatePipe} from "@ngx-translate/core";
import {NgForOf} from "@angular/common";
import {GlobalService} from "../../services/global/global.service";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    LogoComponent,
    TranslatePipe,
    NgForOf
  ],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  constructor(public global: GlobalService) {}

  partners = [
    { name: 'AKAI Professional', link: 'https://www.akaipro.com/' },
    { name: 'Ibanez', link: 'https://www.ibanez.com/eu/' },
    { name: 'Fender', link: 'https://www.fender.com/en-HU/start' }
  ];
  equipments = [
    { name: 'YAMAHA', list: [
        { name: "Yamaha Oak Custom", link: 'https://usa.yamaha.com/products/musical_instruments/drums/'},
        { name: "Yamaha Stage Custom", link: 'https://usa.yamaha.com/products/musical_instruments/drums/'}
        ]
    },
    { name: 'YAMAHA', list: [
        { name: "Pearl Session", link: 'https://pearldrum.com/'},
        { name: "Pearl Session", link: 'https://pearldrum.com/'}
      ]
    },
    { name: 'TAMA', list: [
        { name: "TAMA Superstar", link: 'https://www.tama.com/usa/'},
        { name: "TAMA Superstar", link: 'https://www.tama.com/usa/'}
      ]
    },
  ];
  artists = [
    { name: 'Billie Eilish', link: 'https://store.billieeilish.com/' },
    { name: 'Måneskin', link: 'https://maneskin.com/' },
    { name: 'Bruno Mars', link: 'https://www.brunomars.com/tour' }
  ];
}
