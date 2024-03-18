import { Skeleton, TableCell, TableRow } from "@mui/material";
import { type TableCellProps } from "@mui/material/TableCell/TableCell";
import { type SkeletonProps } from "@mui/material/Skeleton/Skeleton";

type TSkeletonProps = {
  tableLength: number;
  columns: Array<Omit<TableCellProps, "children">>;
  skeletonProps?: SkeletonProps;
};
const TSkeleton = ({ tableLength, columns, skeletonProps }: TSkeletonProps) => {
  return (
    <>
      {Array(tableLength)
        .fill(0)
        .map(() => (
          <TableRow key={crypto.randomUUID()}>
            {columns.map((cell) => (
              <TableCell {...cell} key={crypto.randomUUID()}>
                <Skeleton {...skeletonProps} />
              </TableCell>
            ))}
          </TableRow>
        ))}
    </>
  );
};

export default TSkeleton;
