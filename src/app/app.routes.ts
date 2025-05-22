import { Routes } from '@angular/router';
import {HomeComponent} from "./features/home/home/home.component";
import {ContactComponent} from "./features/contact/contact.component";
import {BookingComponent} from "./features/booking/booking/booking.component";
import {PricesComponent} from "./features/prices/prices.component";
import {RoomsSectionComponent} from "./features/room/rooms-section/rooms-section.component";
import {RoomDetailComponent} from "./features/room-detail/room-detail.component";
import {VerifyBookingComponent} from "./features/booking/verify-booking/verify-booking.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'prices', component: PricesComponent },
  { path: 'room', component: RoomsSectionComponent },
  { path: 'room/:id', component: RoomDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: "verify-booking", component: VerifyBookingComponent },
  { path: '**', redirectTo: '' } // Redirect unknown routes to home
];
