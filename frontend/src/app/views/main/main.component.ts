import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RequestService} from "../../shared/services/request.service";
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth/auth.service";
import {UserInfoType} from "../../../types/user-info.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {UserService} from "../../shared/services/user.service";
import {ArticleType} from "../../../types/article.type";
import {ArticleService} from "../../shared/services/article.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 26,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      }
    },
  }
  reviewOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 25,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
  }
  orderCreate: boolean = false;
  createError: boolean = false;
  isLogged: boolean = false;
  topArticles: ArticleType[] = [];

  popupForm = this.fb.group({
    service: ['', [Validators.required]],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
  })

  @ViewChild('popup') popup!: TemplateRef<ElementRef>;
  dialogRef: MatDialogRef<any> | null = null;

  constructor(private dialog: MatDialog,
              private requestService: RequestService,
              private authService: AuthService,
              private articleService: ArticleService,
              private userService: UserService,
              private fb: FormBuilder,
              private router: Router) {

    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    })
    this.articleService.getTopArticles()
      .subscribe((data: ArticleType[] | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message)
        }
        this.topArticles = data as ArticleType[];
      })
  }

  createOrder() {
    if (this.popupForm.valid && this.popupForm.value.phone && this.popupForm.value.service && this.popupForm.value.name) {
      this.requestService.createOrder(this.popupForm.value.name, this.popupForm.value.phone, this.popupForm.value.service)
        .subscribe({
          next: (data) => {
            if (!data.error) {
              this.orderCreate = true;
              this.createError = false;
            }
          },
          error: (err: HttpErrorResponse) => {
            this.createError = true;
          }
        })
    }
  }

  openPopup(value: string) {
    this.popupForm.patchValue({
      service: value
    });
    if (this.isLogged) {
      this.userService.getUserInfo().subscribe((data: UserInfoType | DefaultResponseType) => {
        this.popupForm.patchValue({
          name: (data as UserInfoType).name
        });
      })
    }
    this.dialogRef = this.dialog.open(this.popup);
    this.dialogRef.backdropClick();
  }

  closePopup() {
    this.dialogRef?.close();
    this.router.navigate(['/']);
    this.popupForm.reset();
    setTimeout(() => {
      this.orderCreate = false;
      this.createError = false;
    }, 1000)
  }
}
