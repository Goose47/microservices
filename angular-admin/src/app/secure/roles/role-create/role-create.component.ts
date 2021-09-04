import { Component, OnInit } from '@angular/core';
import {PermissionService} from "../../../services/permission.service";
import {Response} from "../../../interfaces/response";
import {Permission} from "../../../interfaces/permission";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {RoleService} from "../../../services/role.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit {
  permissions: Permission[] = [];
  form!: FormGroup;

  constructor(
    private permissionService: PermissionService,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      permissions: this.formBuilder.array([])
    })

    this.permissionService.all().subscribe(
      (res: any) => {
        this.permissions = res.data
        this.permissions.forEach((p: Permission) => {
          this.permissionArray.push(
            this.formBuilder.group({
              value: false,
              id: p.id
            })
          )
        });
      }
    )
  }

  get permissionArray() {
    return this.form.get('permissions') as FormArray;
  }

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
      permissions: formData.permissions.filter((p: any) => p.value == true).map((p: any) => p.id)
    }
    this.roleService.create(data).subscribe(
      (res: any) => {
        this.router.navigate(['/roles'])
      }
    )
  }

}
