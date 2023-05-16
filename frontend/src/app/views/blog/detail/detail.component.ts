import {Component, OnInit} from '@angular/core';
import {ArticleDetailType, DetailCommentType} from "../../../../types/article-detail.type";
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {ActiveDetailParamsType} from "../../../../types/active-detail-params.type";
import {ActiveParamsDetailUtil} from "../../../shared/utils/active-params-detail.util";
import {ArticleType} from "../../../../types/article.type";
import {CommentsService} from "../../../shared/services/comments.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {UserCommentActionType} from "../../../../types/user-info.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoaderService} from "../../../shared/services/loader.service";




@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  str: string = '';
  detailArticle: ArticleDetailType | null = null;
  comments: DetailCommentType[] = [];
  articleLink: ActiveDetailParamsType = {url: ''};
  relatedArticles: ArticleType[] = [];
  isLogged: boolean = false;
  isLoading: boolean = false;


  constructor(private articleService: ArticleService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private loaderService: LoaderService,
              private _snackbar: MatSnackBar,
              private commentsService: CommentsService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit() {
    this.authService.isLogged$.subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    })
    this.loaderService.isShowed$.subscribe((isShowed:boolean) => {
      this.isLoading = isShowed;
    })
    this.activatedRoute.params.subscribe(paramLink => {
      this.articleLink = ActiveParamsDetailUtil.processParams(paramLink);
      this.getArticleDetail();
      this.articleService.getRelatedArticles(this.articleLink.url)
        .subscribe((data: ArticleType[]) => {
          this.relatedArticles = data;
        })

    })
  }

  getArticleDetail() {
    this.articleService.getDetailArticle(this.articleLink.url)
      .subscribe((data: ArticleDetailType) => {
        this.detailArticle = data;
        this.comments = data.comments;
        if (this.isLogged) {
          this.commentsService.getCommentsActions({articleId: this.detailArticle.id})
            .subscribe((data: UserCommentActionType[] | DefaultResponseType) => {
              if (data as UserCommentActionType[]) {
                this.comments.map(item => {
                  (data as UserCommentActionType[]).forEach(action => {
                    if (action.comment === item.id) {
                      item.action = action.action;
                    }
                  })
                  return item;
                })
              }
              if (data as DefaultResponseType) {
                // this._snackbar.open((data as DefaultResponseType).message);
                // throw new Error((data as DefaultResponseType).message);
              }
            });
        }
      });
  }

  addComments() {
    this.loaderService.show();
    if (this.detailArticle) {
      const params = {
        offset: this.comments.length,
        article: this.detailArticle.id

      }
      this.commentsService.getAddComments(params)
        .subscribe(data => {
          data.comments.forEach(item => {
            if (this.comments.length < data.allCount) {
              this.comments.push(item);
            }
          })
          this.loaderService.hide();
        })
    }
  }

  postNewComment() {
    if (this.detailArticle) {
      this.commentsService.postNewComment(this.str,this.detailArticle.id)
        .subscribe(data => {
          this.str = '';
          this._snackbar.open('Ваш комментарий успешно добавлен');
          this.getArticleDetail();
          if (data.error) {
            this._snackbar.open('Ошибка, попробуйте повторить запрос');
          }
        })
    }
  }

}
