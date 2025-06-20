import { Component, Input } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: "app-icon",
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <img
      class="h-10 w-10"
      [ngSrc]="'assets/icons/' + iconName + '.png'"
      width="512"
      height="512"
      alt="{{ iconName }} icon"
    />
  `,
})
export class IconComponent {
  @Input() iconName: string = "";
}
