import {
  Component,
  ElementRef,
  Inject,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { GlobalService } from "../../services/global/global.service";
import { DOCUMENT, NgForOf, NgOptimizedImage, NgStyle } from "@angular/common";
import { CtaCardComponent } from "../../shared/atoms/cta-card/cta-card.component";
import { TranslatePipe } from "@ngx-translate/core";
import { MatIcon } from "@angular/material/icon";
import { IconComponent } from "../../shared/atoms/icon/icon.component";
import { RoomListComponent } from "../room/room-list/room-list.component";
import { SalesSectionComponent } from "../../shared/organisms/sales-section/sales-section.component";

@Component({
  selector: "app-room-detail",
  standalone: true,
  imports: [
    CtaCardComponent,
    RouterLink,
    TranslatePipe,
    MatIcon,
    NgForOf,
    IconComponent,
    NgStyle,
    RoomListComponent,
    SalesSectionComponent,
  ],
  templateUrl: "./room-detail.component.html",
})
export class RoomDetailComponent {
  roomId!: number;
  room!: any;
  randomRooms: any[] = [];

  @ViewChild("booking") bookingSection!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    public global: GlobalService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.roomId = +params["id"];
      this.room = this.global.rooms.find((room) => room.id === this.roomId);
      this.randomRooms = this.global.getRandomRooms(3, this.roomId);
    });
  }

  getBackgroundImage(room: any, index: number): string {
    const fallbackImage = "assets/images/rooms/Terrarium.webp";
    const imageUrl =
      "/assets/images/rooms/" + room.image?.[index] || fallbackImage;
    return `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1)), url(${imageUrl})`;
  }
}
