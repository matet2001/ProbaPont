import { Component } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule, NgForm } from "@angular/forms";
import { NgStyle } from "@angular/common";
import { AuthService, UserDetails } from "../../services/auth/auth.service";

@Component({
  selector: "app-account",
  standalone: true,
  imports: [TranslatePipe, FormsModule, NgStyle],
  templateUrl: "./account.component.html",
})
export class AccountComponent {
  user: UserDetails = {
    uid: "",
    email: "",
    fullName: "",
    phone: "",
    bandName: "",
    admin: false,
  };

  isLoading = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authReady.subscribe((authReady) => {
      const userFromService = this.authService.getUser();
      if (userFromService) this.user = userFromService;
    });
  }

  async onSubmit(form: NgForm) {
    if (!form.valid || !this.user) return;

    this.isLoading = true;

    try {
      const { fullName, phone, bandName } = this.user;
      await this.authService.updateUserProfile({ fullName, phone, bandName });
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }
}
