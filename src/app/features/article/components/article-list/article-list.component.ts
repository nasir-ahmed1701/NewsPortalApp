import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { GetAllArticlesRequestApi } from '../../models/get-all-articles-request.api';
import { ResultApiModel } from '../../../../shared/models/result-api.model';
import { PaginationResultApiModel } from '../../../../shared/models/pagination-result-api.model';
import { ArticleApiModel } from '../../models/article-api.model';
import {
  AlertNotificationConfig,
  AlertNotificationTypeEnum,
} from '../../../../shared/models/alert-notification-config';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
})
export class ArticleListComponent implements OnInit {
  articleResult?:
    | ResultApiModel<PaginationResultApiModel<ArticleApiModel>>
    | any;
  filterRequest?: GetAllArticlesRequestApi;
  alertNotificationConfig?: AlertNotificationConfig;
  searchText?: string;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.initializeFilterRequest();
    this.getAllArticles();
  }

  private initializeFilterRequest(
    searchText: string = '',
    pageNumber: number = 1,
    pageSize: number = 5
  ) {
    this.filterRequest = {
      pageSize: pageSize,
      pageNumber: pageNumber,
      searchText: searchText,
    };
  }

  private getAllArticles() {
    this.articleService.getAllArticles(this.filterRequest!).subscribe({
      next: (
        response: ResultApiModel<PaginationResultApiModel<ArticleApiModel>>
      ) => {
        this.articleResult = response;
      },
      error: (err: any) => {
        this.articleResult = {};
        console.error(err.error.errors);
        this.alertNotificationConfig = {
          message: 'An errors occured',
          show: true,
          type: AlertNotificationTypeEnum.danger,
        };
      },
      complete: () => {},
    });
  }

  onPreviousPageClick() {
    let currentPageNumber = this.articleResult?.data?.currentPageNumber || 0;
    let pageNumber = currentPageNumber - 1;

    if (pageNumber > 0) {
      this.initializeFilterRequest(this.searchText, pageNumber);
      this.getAllArticles();
    }
  }

  onNextPageClick() {
    let currentPageNumber = this.articleResult?.data?.currentPageNumber || 0;
    let totalPages = this.articleResult?.data?.totalPages || 0;

    let pageNumber = currentPageNumber + 1;

    if (pageNumber <= totalPages) {
      this.initializeFilterRequest(this.searchText, pageNumber);
      this.getAllArticles();
    }
  }

  onRefresh() {
    this.searchText = '';
    this.initializeFilterRequest();
    this.getAllArticles();
  }

  onSearch() {
    if (this.searchText) {
      this.initializeFilterRequest(this.searchText);
      this.getAllArticles();
    }
  }
}
