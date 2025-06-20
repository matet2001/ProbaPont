import { Component, Input } from "@angular/core";
import { NgForOf, NgOptimizedImage, NgStyle } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-room-card",
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, MatIcon, TranslatePipe, NgForOf],
  templateUrl: "./room-card.component.html",
})
export class RoomCardComponent {
  @Input() room: any;
}
