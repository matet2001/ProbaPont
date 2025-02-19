import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {RoomCardComponent} from "../../components/room-card/room-card.component";
import {TranslatePipe} from "@ngx-translate/core";
import {RoomListComponent} from "../../components/room-list/room-list.component";

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    RoomListComponent
  ],
  templateUrl: './rooms.component.html',
})
export class RoomsComponent {

}

