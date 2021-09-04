import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService extends RestService {
  endpoint(): string {
    return "orders";
  }

  export() {
    return this.http.get(`${environment.api}/export`, {responseType: 'blob'})
  }

  chart() {
    return this.http.get(`${environment.api}/chart`)
  }
}
