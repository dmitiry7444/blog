import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {config} from "../../core/config";
import {CommentParamsType, UserActionsParamsType} from "../../../types/active-params.type";
import {UserCommentActionType} from "../../../types/user-info.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {DetailCommentType} from "../../../types/article-detail.type";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {
  }

  getAddComments(params:CommentParamsType): Observable<{ allCount: number, comments: DetailCommentType[]}> {
    return this.http.get<{ allCount: number, comments: DetailCommentType[]}>(config.api + 'comments', {
      params: params
    });
  }
  postNewComment(text:string, article: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(config.api + 'comments', {
      text: text,
      article: article,
    });
  }

  getCommentsActions(params:UserActionsParamsType): Observable<UserCommentActionType[] | DefaultResponseType> {
    return this.http.get<UserCommentActionType[] | DefaultResponseType>(config.api + 'comments/article-comment-actions',{
      params: params
    });
  }
  getCommentActions(id: string): Observable<UserCommentActionType | DefaultResponseType> {
    return this.http.get<UserCommentActionType | DefaultResponseType>(config.api + '/api/comments/' + id + '/actions');
  }
  postCommentAction(id: string, action:string):Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(config.api + 'comments/' + id + '/apply-action',{
      action: action
    });
  }
}
