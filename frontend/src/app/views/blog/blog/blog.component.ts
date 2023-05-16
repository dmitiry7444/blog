import {Component, OnInit} from '@angular/core';
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ArticleType} from "../../../../types/article.type";
import {ArticleService} from "../../../shared/services/article.service";
import {CategoryService} from "../../../shared/services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {CategoriesType} from "../../../../types/categories.type";
import {AppliedFilterType} from "../../../../types/applied-filter.type";
import {debounceTime} from "rxjs";
import {ActiveParamsUtil} from "../../../shared/utils/active-params.util";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articles: ArticleType[] = [];
  categories: CategoriesType[] = [];
  activeParams: ActiveParamsType = {categories: []};
  appliedFilters: AppliedFilterType[] = [];
  sortingOpen = false;
  pages: number[] = [];

  constructor(private articleService: ArticleService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.processCatalog();
    console.log(this.categories)
  }


  processCatalog() {
    this.categoryService.getCategories()
      .subscribe(data => {
        this.categories = data;

        this.activatedRoute.queryParams
          .pipe(
            debounceTime(500)
          )
          .subscribe(params => {
            this.activeParams = ActiveParamsUtil.processParams(params);

            this.appliedFilters = [];
            this.activeParams.categories.forEach(url => {
              const foundCategory = this.categories.find(category => category.url === url);
              if (foundCategory) {
                this.appliedFilters.push({
                  name: foundCategory.name,
                  urlParam: foundCategory.url
                });
                foundCategory.activeFilter = true;
              }

            });

            this.articleService.getArticles(this.activeParams)
              .subscribe(data => {
                this.pages = [];
                for (let i = 1; i <= data.pages; i++) {
                  this.pages.push(i);
                }
                this.articles = data.items;
              })
          });
      })
  }

  updateFilterParam(url: string) {

    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      const existingTypeInParam = this.activeParams.categories.find(item => item === url);
      if (existingTypeInParam) {
        this.categories.find(item => {
          if (item.url === url) {
            item.activeFilter = false;
          }
        });
        this.activeParams.categories = this.activeParams.categories.filter(item => item !== url)
      } else if (!existingTypeInParam) {
        this.categories.find(item => {
          if (item.url === url) {
            item.activeFilter = true;
          }
        });
        // this.activeParams.types.push(url);
        this.activeParams.categories = [...this.activeParams.categories, url];
      }
    } else {
      this.activeParams.categories = [url];
    }

    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    })
  }

  removeAppliedFiler(appliedFilter: AppliedFilterType) {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== appliedFilter.urlParam)
    this.categories.find(item => {
      if (item.url === appliedFilter.urlParam) {
        item.activeFilter = false;
      }
    });
    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    })
  }

  toggleSorting() {
    this.sortingOpen = !this.sortingOpen
  }


  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    })
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      })
    }
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      })
    }

  }
}
