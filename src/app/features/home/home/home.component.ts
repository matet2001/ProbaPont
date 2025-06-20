import { Component } from "@angular/core";
import { MatCard, MatCardContent, MatCardHeader } from "@angular/material/card";
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { TranslatePipe } from "@ngx-translate/core";
import { LogoComponent } from "../../../shared/atoms/logo/logo.component";
import { CtaCardComponent } from "../../../shared/atoms/cta-card/cta-card.component";
import { GlobalService } from "../../../services/global/global.service";
import { NgOptimizedImage } from "@angular/common";
import { HomeIntroductionComponent } from "../home-introduction/home-introduction.component";
import { RoomsSectionComponent } from "../../room/rooms-section/rooms-section.component";
import { RoomListComponent } from "../../room/room-list/room-list.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    HomeIntroductionComponent,
    RoomsSectionComponent,
    RoomListComponent,
  ],
  templateUrl: "./home.component.html",
})
export class HomeComponent {}
