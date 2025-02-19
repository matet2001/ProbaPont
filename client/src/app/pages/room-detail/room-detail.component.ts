import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [],
  templateUrl: './room-detail.component.html',
})
export class RoomDetailComponent {
  roomId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id')!; // Get ID from URL
  }
}
