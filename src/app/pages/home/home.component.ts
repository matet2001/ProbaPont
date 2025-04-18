import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {TranslatePipe} from "@ngx-translate/core";
import {LogoComponent} from "../../components/logo/logo.component";
import {CtaCardComponent} from "../../components/cta-card/cta-card.component";
import {GlobalService} from "../../services/global/global.service";
import {NgOptimizedImage} from "@angular/common";
import {HomeIntroductionComponent} from "../../components/home-introduction/home-introduction.component";
import {RoomsComponent} from "../rooms/rooms.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeIntroductionComponent,
    RoomsComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
}
