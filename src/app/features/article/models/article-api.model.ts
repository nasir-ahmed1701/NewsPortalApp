import { CategoryApiModel } from './category-api.model';

export interface ArticleApiModel {
  id: number;
  title: string;
  categoryId: number;
  description: string;
  createdDateTimeUtc: Date;
  category: CategoryApiModel;
}
