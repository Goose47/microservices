import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends RestService {
  endpoint(): string {
    return "roles";
  }
}
