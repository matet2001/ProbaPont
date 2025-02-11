import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {BookingComponent} from "./pages/booking/booking.component";
import {PricesComponent} from "./pages/prices/prices.component";
import {RoomsComponent} from "./pages/rooms/rooms.component";

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'booking', component: BookingComponent }, // Default route
  { path: 'prices', component: PricesComponent }, // Default route
  { path: 'rooms', component: RoomsComponent }, // Default route
  { path: 'contact', component: ContactComponent }, // About route
  { path: '**', redirectTo: '' } // Redirect unknown routes to home
];
