import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllArticlesRequestApi } from '../models/get-all-articles-request.api';
import { Observable } from 'rxjs';
import { ResultApiModel } from '../../../shared/models/result-api.model';
import { PaginationResultApiModel } from '../../../shared/models/pagination-result-api.model';
import { ArticleApiModel } from '../models/article-api.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private httpClient: HttpClient) {}

  getAllArticles(request: GetAllArticlesRequestApi): Observable<ResultApiModel<PaginationResultApiModel<ArticleApiModel>>> {
    return this.httpClient.post<ResultApiModel<PaginationResultApiModel<ArticleApiModel>>>(
      'http://localhost:55682/api/articles/get-all',
      request
    );
  }
}
