import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-cta-card",
  standalone: true,
  imports: [RouterLink, MatIcon],
  templateUrl: "./cta-card.component.html",
  styles: ``,
})
export class CtaCardComponent {
  @Input() title: string = "";
  @Input() icon: string = "";
  @Input() link: string = "";
  @Input() content: string = "";
}
