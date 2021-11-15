import { Component, OnInit } from "@angular/core";
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from "../_services/token-storage.service";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
    isLoggedIn = false;
    currentUser: string[] = [];

    constructor(private token: TokenStorageService, private authService: AuthService) {}

    ngOnInit(): void {
        if (this.token.getToken()) {
            this.isLoggedIn = true;
            this.currentUser = this.token.getUser();
        }
    }
}
