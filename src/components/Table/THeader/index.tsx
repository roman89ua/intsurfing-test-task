import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { memo, MouseEvent } from "react";
import { usePokemonsSearchParams } from "../../../hooks/usePokemonsSearchParams.tsx";
import {
  GridColumns,
  SearchParamsValues,
  SortOrderDirection,
} from "../../../types.ts";

const THeader = memo(({ columns }: { columns: GridColumns }) => {
  const { order, columnToOrderBy, setSearchParam } = usePokemonsSearchParams();

  const orderByHandler = (e: MouseEvent<HTMLSpanElement>) => {
    setSearchParam((prev) => {
      prev.set(SearchParamsValues.orderBy, e.currentTarget.id);

      if (
        prev.has(SearchParamsValues.order) &&
        prev.get(SearchParamsValues.order) === SortOrderDirection.asc
      ) {
        prev.set(SearchParamsValues.order, SortOrderDirection.desc);
      } else {
        prev.set(SearchParamsValues.order, SortOrderDirection.asc);
      }
      return prev;
    });
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => {
          return (
            <TableCell
              color="primary"
              key={headCell.field}
              sx={{
                backgroundColor: "dodgerblue",
              }}
            >
              <TableSortLabel
                active={headCell.field === columnToOrderBy}
                direction={order}
                id={headCell.field}
                onClick={orderByHandler}
              >
                {headCell.headerName}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
});

export default THeader;
