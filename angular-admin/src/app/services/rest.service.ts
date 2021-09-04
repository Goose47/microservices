import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {

  abstract endpoint(): string

  constructor(
    protected http: HttpClient
  ) {

  }

  get url() {
    return `${environment.api}/${this.endpoint()}`
  }

  all(page?: number) {
    let url = this.url;

    if(page) {
      url += `?page=${page}`;
    }

    return this.http.get(url);
  }

  get(id: number) {
    return this.http.get(`${this.url}/${id}`)
  }

  create(data: any) {
    return this.http.post(this.url, data)
  }

  update(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data)
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
