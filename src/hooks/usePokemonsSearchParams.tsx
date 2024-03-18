import {
  PokemonRow,
  SearchParamsValues,
  SortOrderDirection,
} from "../types.ts";
import { useSearchParams } from "react-router-dom";

const DEFAULT_PAGE_VALUE = 0;
const DEFAULT_ROW_PER_PAGE_VALUE = 10;
const DEFAULT_COLUMN_TO_ORDER_BY = "id";
const DEFAULT_ORDER: SortOrderDirection = SortOrderDirection.asc;

export const usePokemonsSearchParams = () => {
  const [searchParam, setSearchParam] = useSearchParams(
    new URLSearchParams({
      [SearchParamsValues.page]: DEFAULT_PAGE_VALUE.toString(),
      [SearchParamsValues.rowPerPage]: DEFAULT_ROW_PER_PAGE_VALUE.toString(),
      [SearchParamsValues.orderBy]: DEFAULT_COLUMN_TO_ORDER_BY.toString(),
      [SearchParamsValues.order]: DEFAULT_ORDER.toString(),
    }),
  );
  const rowPerPage: number = searchParam.has(SearchParamsValues.rowPerPage)
    ? Number(searchParam.get(SearchParamsValues.rowPerPage))
    : DEFAULT_ROW_PER_PAGE_VALUE;

  const currentPage: number = searchParam.has(SearchParamsValues.page)
    ? Number(searchParam.get(SearchParamsValues.page))
    : DEFAULT_PAGE_VALUE;

  const columnToOrderBy: keyof PokemonRow = (
    searchParam.has(SearchParamsValues.orderBy)
      ? searchParam.get(SearchParamsValues.orderBy)
      : DEFAULT_COLUMN_TO_ORDER_BY
  ) as keyof PokemonRow;

  const order: SortOrderDirection = (
    searchParam.has(SearchParamsValues.order)
      ? searchParam.get(SearchParamsValues.order)
      : DEFAULT_ORDER
  ) as SortOrderDirection;

  return {
    searchParam,
    columnToOrderBy,
    currentPage,
    order,
    rowPerPage,
    setSearchParam,
  };
};
