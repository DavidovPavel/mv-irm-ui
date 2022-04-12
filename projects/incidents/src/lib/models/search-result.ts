export interface PaginatedQuery {
  pageIndex: number;
  pageSize: number;
}

export interface SearchResult<T> {
  paginatedQuery: PaginatedQuery;
  totalSize: number;
  data: T[];
}
