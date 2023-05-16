import {Component, Input, OnInit} from '@angular/core';
import {DetailCommentType} from "../../../../types/article-detail.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Actions} from "../../../../types/user-comment-actions.type";
import {CommentsService} from "../../services/comments.service";
import {AuthService} from "../../../core/auth/auth.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() comment!: DetailCommentType;
  likesCount: number = 0;
  dislikesCount: number = 0;
  like: boolean = false;
  dislike: boolean = false;
  isLogged: boolean = false;

  constructor(private _snackbar: MatSnackBar,
              private authService: AuthService,
              private commentsService: CommentsService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit() {
    setTimeout(() => {
      this.checkValue()
    }, 100);
    this.likesCount = this.comment.likesCount;
    this.dislikesCount = this.comment.dislikesCount;
  }

  checkValue() {
    if (this.comment.action) {
      if (this.comment.action === Actions.like) {
        this.like = true;
      }
      if (this.comment.action === Actions.dislike) {
        this.dislike = true;
      }
    }
  }

  postLike() {
    if (this.isLogged) {
      if (!this.like) {
        this.commentsService.postCommentAction(this.comment.id, Actions.like)
          .subscribe(data => {
            if (!data.error) {
              if (this.dislike) {
                this.dislike = false;
                this.dislikesCount = --this.dislikesCount;
              }
              this.like = true;
              this.dislike = false;
              this.likesCount = ++this.likesCount;
              this._snackbar.open('Ваш голос учтен');
            } else {
              this._snackbar.open('Произошла ошибка попробуйте повторить операцию')
            }
          })
      } else {
        this.commentsService.postCommentAction(this.comment.id, Actions.like)
          .subscribe(data => {
            if (!data.error) {
              this.like = false;
              this.likesCount = --this.likesCount;
              this._snackbar.open('Ваш голос учтен')
            } else {
              this._snackbar.open('Произошла ошибка попробуйте повторить операцию')
            }
          });
      }
    } else {
      this._snackbar.open('Для совершения операции необходимо авторизоваться')
    }
  }

  postDislike() {
    if (this.isLogged) {
      if (!this.dislike) {
        this.commentsService.postCommentAction(this.comment.id, Actions.dislike)
          .subscribe(data => {
            if (!data.error) {
              if (this.like) {
                this.like = false;
                this.likesCount = --this.likesCount;
              }
              this.dislike = true;
              this.dislikesCount = ++this.dislikesCount;
              this._snackbar.open('Ваш голос учтен')
            } else {
              this._snackbar.open('Произошла ошибка попробуйте повторить операцию')
            }
          });
      } else {
        this.commentsService.postCommentAction(this.comment.id, Actions.dislike)
          .subscribe(data => {
            if (!data.error) {
              this.dislike = false;
              this.dislikesCount = --this.dislikesCount;
              this._snackbar.open('Ваш голос учтен')
            } else {
              this._snackbar.open('Произошла ошибка попробуйте повторить операцию')
            }
          });
      }
    } else {
      this._snackbar.open('Для совершения операции необходимо авторизоваться')
    }
  }

  postViolate() {
    if (this.isLogged) {
      this.commentsService.postCommentAction(this.comment.id, Actions.violate)
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this._snackbar.open('Ваша жалоба на спам отправлена')
            }
          },
          error: (error:HttpErrorResponse) => {
            if (error) {
              this._snackbar.open('Жалоба уже отправлена.')
            }
          },
        });
    } else {
        this._snackbar.open('Для совершения операции необходимо авторизоваться')
      }
    }

  }
