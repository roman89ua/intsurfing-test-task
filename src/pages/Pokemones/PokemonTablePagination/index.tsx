import { TablePagination } from "@mui/material";
import { MouseEvent } from "react";
import { SearchParamsValues } from "../../../types.ts";
import "./styles.css";
import { usePokemonsSearchParams } from "../../../hooks/usePokemonsSearchParams.tsx";

type PokemonTablePaginationProps = {
  totalItems: number;
};
const PokemonTablePagination = ({
  totalItems,
}: PokemonTablePaginationProps) => {
  const { currentPage, rowPerPage, setSearchParam } = usePokemonsSearchParams();

  const handleChangePage = (
    _e: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setSearchParam(
      (prev) => {
        prev.set(SearchParamsValues.page, newPage.toString());
        return prev;
      },
      { replace: true },
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchParam(
      (prev) => {
        prev.set(
          SearchParamsValues.rowPerPage,
          parseInt(event.target.value, 10).toString(),
        );
        prev.set(SearchParamsValues.page, "0");
        return prev;
      },
      { replace: true },
    );
  };

  return (
    <TablePagination
      className="pokemonPaginationBody"
      component="div"
      count={totalItems}
      page={currentPage}
      onPageChange={handleChangePage}
      rowsPerPage={rowPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default PokemonTablePagination;
