import { Component } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-sales-section",
  standalone: true,
  imports: [MatIcon, TranslatePipe],
  templateUrl: "./sales-section.component.html",
})
export class SalesSectionComponent {}
