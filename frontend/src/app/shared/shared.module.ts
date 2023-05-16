import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import {RouterModule} from "@angular/router";
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { ShowHidePasswordComponent } from './components/show-hide-password/show-hide-password.component';
import {LoaderComponent} from "./components/loader/loader.component";
import { RightsComponent } from './rights/rights.component';



@NgModule({
  declarations: [
    ArticleCardComponent,
    CommentCardComponent,
    ShowHidePasswordComponent,
    LoaderComponent,
    RightsComponent,
  ],
    exports: [
        ArticleCardComponent,
        CommentCardComponent,
        ShowHidePasswordComponent,
      LoaderComponent,
    ],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class SharedModule { }
