import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {BookingComponent} from "./pages/booking/booking.component";
import {PricesComponent} from "./pages/prices/prices.component";
import {RoomsComponent} from "./pages/rooms/rooms.component";
import {RoomDetailComponent} from "./pages/room-detail/room-detail.component";
import {VerifyBookingComponent} from "./components/verify-booking/verify-booking.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'prices', component: PricesComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'room/:id', component: RoomDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: "verify-booking", component: VerifyBookingComponent },
  { path: '**', redirectTo: '' } // Redirect unknown routes to home
];
