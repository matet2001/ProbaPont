import { Component } from "@angular/core";
import { NgForOf } from "@angular/common";
import { RoomCardComponent } from "../room-card/room-card.component";
import { TranslatePipe } from "@ngx-translate/core";
import { RoomListComponent } from "../room-list/room-list.component";
import { GlobalService } from "../../../services/global/global.service";

@Component({
  selector: "app-rooms-section",
  standalone: true,
  imports: [RoomListComponent, TranslatePipe],
  templateUrl: "./rooms-section.component.html",
})
export class RoomsSectionComponent {
  constructor(public global: GlobalService) {}
}
