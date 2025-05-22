import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RoomCardComponent} from "../room-card/room-card.component";
import {TranslatePipe} from "@ngx-translate/core";
import {GlobalService} from "../../../services/global/global.service";

@Component({
  selector: 'app-room-list',
  standalone: true,
    imports: [
        NgForOf,
        RoomCardComponent,
    ],
  templateUrl: './room-list.component.html',
})
export class RoomListComponent {
  @Input() rooms: any[] = [];
}
