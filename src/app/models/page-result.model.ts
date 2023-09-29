export class PageResultModel<T> {
  count!: number;
  pageIndex!: number;
  pageSize!: number;
  items!: T[];
}
