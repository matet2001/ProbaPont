import { Component, Input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-info-modal",
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: "./info-modal.component.html",
  styles: ``,
})
export class InfoModalComponent {
  @Input() title: string = "";
  @Input() content: string = "";
}
