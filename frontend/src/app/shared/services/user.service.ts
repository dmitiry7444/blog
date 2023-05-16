import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DefaultResponseType} from "../../../types/default-response.type";
import {UserInfoType} from "../../../types/user-info.type";
import {config} from "../../core/config";

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http: HttpClient) {
  }


  getUserInfo(): Observable<UserInfoType | DefaultResponseType> {
    return this.http.get<UserInfoType | DefaultResponseType>(config.api + 'users');
  }
}
