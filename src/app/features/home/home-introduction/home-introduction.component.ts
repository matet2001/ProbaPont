import { Component } from "@angular/core";
import { CtaCardComponent } from "../../../shared/atoms/cta-card/cta-card.component";
import { MatIcon } from "@angular/material/icon";
import { TranslatePipe } from "@ngx-translate/core";
import { GlobalService } from "../../../services/global/global.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-home-introduction",
  standalone: true,
  imports: [CtaCardComponent, MatIcon, TranslatePipe, RouterLink],
  templateUrl: "./home-introduction.component.html",
})
export class HomeIntroductionComponent {
  constructor(public global: GlobalService) {}
}
