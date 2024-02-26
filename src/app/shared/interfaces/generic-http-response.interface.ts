export interface GenericHTTPResponse<T> {
  content?: T[];
  contentSize?: number;
  index?: number;
  size?: number;
  total?: number;
}
