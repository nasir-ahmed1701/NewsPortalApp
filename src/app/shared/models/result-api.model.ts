import { ResultBaseApiModel } from './result-base-api.model';

export interface ResultApiModel<T> extends ResultBaseApiModel {
  data?: T;
}
