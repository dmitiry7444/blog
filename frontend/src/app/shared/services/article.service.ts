import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {config} from "../../core/config";
import {ArticleType} from "../../../types/article.type";
import {ActiveParamsType} from "../../../types/active-params.type";
import {ArticleDetailType} from "../../../types/article-detail.type";
import {Params} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  getTopArticles(): Observable<ArticleType[] | DefaultResponseType> {
    return this.http.get<ArticleType[] | DefaultResponseType>(config.api + 'articles/top');
  }

  getArticles(params:ActiveParamsType): Observable<{count: number, pages: number,items:ArticleType[]}> {
    return this.http.get<{count: number, pages: number,items:ArticleType[]}>(config.api + 'articles', {
      params: params
    })
  }
  getRelatedArticles(url:string): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(config.api + 'articles/related/' + url)
  }
  getDetailArticle(url:string): Observable<ArticleDetailType> {
    return this.http.get<ArticleDetailType>(config.api + 'articles/' + url)
  }
}
