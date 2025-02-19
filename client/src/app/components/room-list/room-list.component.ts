import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {RoomCardComponent} from "../room-card/room-card.component";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-room-list',
  standalone: true,
    imports: [
        NgForOf,
        RoomCardComponent,
        TranslatePipe
    ],
  templateUrl: './room-list.component.html',
  styles: ``
})
export class RoomListComponent {
  rooms = [
    {
      "id": 1,
      "name": "Aquarium",
      "image": "assets/images/rooms/Aquarium.webp",
      "size": "25 m²",
      "price": "3000",
      "price_additional": "FEATURES.ROOM_1.PRICE_ADD",
      "features": [
        { "description": "FEATURES.ROOM_1.1", "icon": "ac_unit" },
        { "description": "FEATURES.ROOM_1.2", "icon": "waves" }
      ]
    },
    {
      "id": 2,
      "name": "Terrarium",
      "image": "assets/images/rooms/Terrarium.webp",
      "size": "30 m²",
      "price": "3500",
      "price_additional": "FEATURES.ROOM_2.PRICE_ADD",
      "features": [
        { "description": "FEATURES.ROOM_2.1", "icon": "nature" },
        { "description": "FEATURES.ROOM_2.2", "icon": "spa" }
      ]
    },
    {
      "id": 3,
      "name": "Inferno",
      "image": "assets/images/rooms/Inferno.webp",
      "size": "35 m²",
      "price": "4000",
      "price_additional": "FEATURES.ROOM_3.PRICE_ADD",
      "features": [
        { "description": "FEATURES.ROOM_3.1", "icon": "whatshot" },
        { "description": "FEATURES.ROOM_3.2", "icon": "lightbulb" }
      ]
    },
    {
      "id": 4,
      "name": "Cosmos",
      "image": "assets/images/rooms/Cosmos.webp",
      "size": "40 m²",
      "price": "4500",
      "price_additional": "FEATURES.ROOM_4.PRICE_ADD",
      "features": [
        { "description": "FEATURES.ROOM_4.1", "icon": "nightlight_round" },
        { "description": "FEATURES.ROOM_4.2", "icon": "science" }
      ]
    },
    {
      "id": 5,
      "name": "Ember",
      "image": "assets/images/rooms/Ember.webp",
      "size": "28 m²",
      "price": "4000",
      "price_additional": "FEATURES.ROOM_5.PRICE_ADD",
      "features": [
        { "description": "FEATURES.ROOM_5.1", "icon": "chair" },
        { "description": "FEATURES.ROOM_5.2", "icon": "music_note" }
      ]
    },
    {
      "id": 6,
      "name": "Phantom",
      "image": "assets/images/rooms/Phantom.webp",
      "size": "22 m²",
      "price": "4000",
      "price_additional": "FEATURES.ROOM_6.PRICE_ADD",
      "features": [
        { "description": "FEATURES.ROOM_6.1", "icon": "visibility" },
        { "description": "FEATURES.ROOM_6.2", "icon": "contrast" }
      ]
    }
  ]

}
