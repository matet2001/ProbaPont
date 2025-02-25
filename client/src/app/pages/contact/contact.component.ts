import { Component } from '@angular/core';
import {Loader} from "@googlemaps/js-api-loader";
import {TranslatePipe} from "@ngx-translate/core";
import {NgStyle} from "@angular/common";
import mapStyle from "../../../assets/map-styles.json";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    TranslatePipe,
    NgStyle
  ],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  ngOnInit() {
    const loader = new Loader({
      apiKey: 'AIzaSyApJybOR12b3mq7Fy00OsnVkpHoP0u0gjQ',
    });

    loader.load().then(() => {
      const center = { lat: 47.50507459467509, lng: 19.05782807046606 };

      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: center,
        zoom: 17,
        styles: mapStyle,
      });

      // Add a marker at the center
      new google.maps.Marker({
        position: center,
        map: map,
        title: 'Our Location',
        icon: {
          url: 'assets/Logo-dark.png', // Your logo path
          scaledSize: new google.maps.Size(100, 50), // Adjust size
          anchor: new google.maps.Point(25, 50) // Centers the image
        }
      });
    });
  }

  getBackgroundImage(): string {
    const fallbackImage = 'assets/images/rooms/Terrarium.webp';
    const imageUrl = "assets/images/rehearsal-room.jpg" || fallbackImage;
    return `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1)), url(${imageUrl})`;
  }
}
