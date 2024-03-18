import TSkeleton from "../../../components/Table/TSkeleton";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import { PokemonRow } from "../../../types.ts";
import { memo } from "react";
import { usePokemonsSearchParams } from "../../../hooks/usePokemonsSearchParams.tsx";

type PokemonsTableBodyProps = {
  isLoading: boolean;
  rows: PokemonRow[];
};
const PokemonsTableBody = memo(
  ({ isLoading, rows }: PokemonsTableBodyProps) => {
    const { rowPerPage } = usePokemonsSearchParams();

    return (
      <TableBody>
        {isLoading ? (
          <TSkeleton
            tableLength={rowPerPage}
            columns={[{ width: "10%" }, { width: "90%" }]}
          />
        ) : (
          <>
            {rows?.map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell width={"10%"}>{row.id}</TableCell>
                  <TableCell width={"90%"}>
                    <Link to={`/pokemon-details/${row.id}`}>{row.name}</Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        )}
      </TableBody>
    );
  },
);

export default PokemonsTableBody;
