export interface PagingRequestModel {
  PageNumber: number;
  PageSize: number;
  OrderBy: string;
  Direction: string;
  Search?: string;
}
