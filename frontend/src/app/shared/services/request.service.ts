import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {config} from "../../core/config";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  getConsultation(name: string, phone: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(config.api + 'requests', {
      name: name,
      phone: phone,
      type: 'consultation'
    });
  }

  createOrder(name: string, phone: string, service: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(config.api + 'requests', {
      name: name,
      phone: phone,
      service: service,
      type: 'order'
    });
  }
}
