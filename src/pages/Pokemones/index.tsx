import { useCallback, useEffect, useState } from "react";
import {
  GridColumns,
  PokemonesData,
  PokemonesModifiedData,
  PokemonRow,
  SearchParamsValues,
  SortOrderDirection,
} from "../../types.ts";
import { Paper, Table, TableContainer, Typography } from "@mui/material";
import THeader from "../../components/Table/THeader";
import PokemonsTableBody from "./PokemonsTableBody";
import PokemonTablePagination from "./PokemonTablePagination";
import { usePokemonsSearchParams } from "../../hooks/usePokemonsSearchParams.tsx";
import ErrorCP from "../../components/ErrorCP";

const POKEMON_COLUMNS: GridColumns = [
  { field: "id", headerName: "Id" },
  { field: "name", headerName: "Pokemon name" },
];
const Pokemones = () => {
  const { searchParam, columnToOrderBy, order, currentPage, rowPerPage } =
    usePokemonsSearchParams();
  const [pokemonsData, setPokemonesData] = useState<PokemonesModifiedData>();
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const sortByOrderHandler = useCallback(
    (
      sortTarget: PokemonRow[],
      order: SortOrderDirection,
      byField: keyof PokemonRow,
    ) => {
      sortTarget.sort((a, b) => {
        if (a[byField] > b[byField])
          return order === SortOrderDirection.asc ? 1 : -1;
        if (a[byField] === b[byField]) return 0;
        return order === SortOrderDirection.asc ? -1 : 1;
      });
    },
    [],
  );

  const getPokemonsData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${rowPerPage * currentPage}&limit=${rowPerPage}`,
      );
      const data: PokemonesData = await response.json();
      let modifiedData: PokemonesModifiedData;
      if (data) {
        modifiedData = {
          ...data,
          results: data.results.map((pokemon) => ({
            id: Number(pokemon.url.split("/").at(-2)),
            ...pokemon,
          })),
        };
        if (
          searchParam.has(SearchParamsValues.orderBy) ||
          searchParam.has(SearchParamsValues.order)
        ) {
          sortByOrderHandler(modifiedData.results, order, columnToOrderBy);
        }

        setPokemonesData(modifiedData);
      }
    } catch (e) {
      console.error(e);
      setError("Something went wrong with pokemones data fetching");
    } finally {
      setIsLoading(false);
    }
  }, [
    sortByOrderHandler,
    searchParam,
    columnToOrderBy,
    currentPage,
    order,
    rowPerPage,
  ]);

  useEffect(() => {
    getPokemonsData();
  }, [getPokemonsData, rowPerPage, currentPage]);

  useEffect(() => {
    if (pokemonsData?.results) {
      sortByOrderHandler(pokemonsData?.results, order, columnToOrderBy);
    }
  }, [pokemonsData?.results, sortByOrderHandler, order, columnToOrderBy]);

  if (error) {
    return <ErrorCP message={error} />;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom align={"center"}>
        Pokemons list
      </Typography>

      <TableContainer component={Paper} style={{ overflowX: "initial" }}>
        <Table aria-label="pokemones-table" stickyHeader>
          <THeader columns={POKEMON_COLUMNS} />

          <PokemonsTableBody
            isLoading={isLoading}
            rows={pokemonsData?.results ?? []}
          />
        </Table>
      </TableContainer>
      <PokemonTablePagination totalItems={pokemonsData?.count || 0} />
    </>
  );
};

export default Pokemones;
