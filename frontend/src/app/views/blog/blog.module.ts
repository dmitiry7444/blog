import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { DetailComponent } from './detail/detail.component';
import { BlogComponent } from './blog/blog.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DetailComponent,
    BlogComponent
  ],
    imports: [
        CommonModule,
        BlogRoutingModule,
        SharedModule,
        FormsModule
    ]
})
export class BlogModule { }
