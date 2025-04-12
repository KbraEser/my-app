import {
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import {
  gridPageCountSelector,
  gridPageSelector,
  gridPageSizeSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

const CustomDataGridFooter = (
  handlePageSizeChange: (event: SelectChangeEvent<number>) => void
) => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);

  const pageSizes = [2, 5, 10, 20, 50];

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      direction="row"
      width={1}
      spacing={2}
      sx={{ mt: 1 }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2" color="text.primary">
          Sayfa Boyutu
        </Typography>
        <Select
          value={pageSize}
          onChange={handlePageSizeChange}
          variant="outlined"
          sx={{
            width: 60,
            ml: 1,
          }}
        >
          {pageSizes.map((size) => (
            <MenuItem key={size} value={size}>
              <Typography variant="body2" color="text.primary">
                {size}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => {
          event.preventDefault();
          apiRef?.current?.setPage(value - 1);
        }}
      />
    </Stack>
  );
};
