import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllArticlesRequestApi } from '../models/get-all-articles-request.api';
import { Observable } from 'rxjs';
import { ResultApiModel } from '../../../shared/models/result-api.model';
import { PaginationResultApiModel } from '../../../shared/models/pagination-result-api.model';
import { ArticleApiModel } from '../models/article-api.model';
import { environment } from '../../../../environments/environment';
import { CategoryApiModel } from '../models/category-api.model';
import { CreateArticleRequestApiModel } from '../models/create-article-request-api.model';
import { UpdateArticleRequestApiModel } from '../models/update-article-request-api.model';
import { ResultBaseApiModel } from '../../../shared/models/result-base-api.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private httpClient: HttpClient) {}

  getAllArticles(
    request: GetAllArticlesRequestApi
  ): Observable<ResultApiModel<PaginationResultApiModel<ArticleApiModel>>> {
    return this.httpClient.post<
      ResultApiModel<PaginationResultApiModel<ArticleApiModel>>
    >(`${environment.apiUrl}/articles/get-all`, request);
  }

  getAllCategories(): Observable<ResultApiModel<CategoryApiModel>> {
    return this.httpClient.get<ResultApiModel<CategoryApiModel>>(
      `${environment.apiUrl}/categories/get-all`
    );
  }

  createArticle(
    request: CreateArticleRequestApiModel
  ): Observable<ResultApiModel<number>> {
    return this.httpClient.post<ResultApiModel<number>>(
      `${environment.apiUrl}/articles`,
      request
    );
  }

  updateArticle(
    id: number,
    request: UpdateArticleRequestApiModel
  ): Observable<ResultApiModel<ArticleApiModel>> {
    return this.httpClient.put<ResultApiModel<ArticleApiModel>>(
      `${environment.apiUrl}/articles/${id}`,
      request
    );
  }

  getArticle(id: number): Observable<ResultApiModel<ArticleApiModel>> {
    return this.httpClient.get<ResultApiModel<ArticleApiModel>>(
      `${environment.apiUrl}/articles/${id}`
    );
  }

  deleteArticle(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.apiUrl}/articles/${id}`
    );
  }
}
