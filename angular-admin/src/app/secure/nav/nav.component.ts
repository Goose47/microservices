import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {Router} from "@angular/router";
import {Auth} from "../../classes/auth";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user!: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    Auth.userEmitter.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }

  logout() {
    this.authService.logout({}).subscribe(
      () => {
        this.router.navigate(['/login'])
      }
    );
    this.router.navigate(['/login']);
  }
}
