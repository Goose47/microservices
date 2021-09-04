import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) {

  }
  upload(data: any) {
    return this.http.post(`${environment.api}/upload`, data)
  }
}
