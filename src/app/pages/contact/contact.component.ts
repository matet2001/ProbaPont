import { Component } from '@angular/core';
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
  ngAfterViewInit() {
    if (typeof google === "undefined") {
      console.error("Google Maps API is not loaded.");
      return;
    }

    this.initMap();
  }

  async initMap(): Promise<void> {
    const center = { lat: 47.50507459467509, lng: 19.05782807046606 };
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const map = new Map(document.getElementById("map") as HTMLElement, {
      center: center,
      zoom: 17,
      styles: mapStyle,
      mapId: "9fc67a33f8cd6041"
    });

    const icon = document.createElement('div');
    icon.innerHTML = '<i class="fa fa-music fa-lg"></i>';
    const faPin = new PinElement({
      glyph: icon,
      glyphColor: '#ffffff',
      background: '#008080',
      borderColor: '#000000',
    });

    new AdvancedMarkerElement({
      map,
      position: center,
      content: faPin.element,
      title: 'A marker using a FontAwesome icon for the glyph.'
    });
  }

  getBackgroundImage(): string {
    const fallbackImage = 'assets/images/rooms/Terrarium.webp';
    const imageUrl = "assets/images/rehearsal-room.jpg" || fallbackImage;
    return `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1)), url(${imageUrl})`;
  }
}
