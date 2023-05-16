import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {config} from "../../core/config";
import {CategoriesType} from "../../../types/categories.type";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<CategoriesType[]> {
    return this.http.get<CategoriesType[]>(config.api + 'categories');
  }
}
