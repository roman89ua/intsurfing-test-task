export type PokemonRow = { id: number; name: string; url: string };

export interface Result {
  name: string;
  url: string;
}

export interface PokemonesData {
  count: number;
  next: string;
  previous: string;
  results: Result[];
}
export interface PokemonesModifiedData {
  count: number;
  next: string;
  previous: string;
  results: PokemonRow[];
}

export enum SearchParamsValues {
  page = "page",
  rowPerPage = "rowPerPage",
  orderBy = "orderBy",
  order = "order",
}

export enum SortOrderDirection {
  asc = "asc",
  desc = "desc",
}

export type GridColumns = { field: keyof PokemonRow; headerName: string }[];
