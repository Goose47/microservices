import { Component, OnInit } from '@angular/core';
import {Role} from "../../interfaces/role";
import {RoleService} from "../../services/role.service";
import {Auth} from "../../classes/auth";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];

  constructor(
    private roleService: RoleService,
  ) {

  }

  ngOnInit(): void {
    this.roleService.all().subscribe(
      (res: any) => {
        this.roles = res.data
      }
    );
  }

  delete(id: number) {
    if(confirm('Are you sure?')) {
      this.roleService.delete(id).subscribe(
        res => {
          this.roles = this.roles.filter(u => u.id != id);
        }
      );
    }
  }

  canAccess(permissions: any) {
    return Auth.canAccess(permissions)
  }
}
