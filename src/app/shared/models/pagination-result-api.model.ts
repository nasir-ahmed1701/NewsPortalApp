export interface PaginationResultApiModel<T> {
  totalCount: number;
  totalPages: number;
  currentPageNumber: number;
  currentPageSize: number;
  items: T[];
}
