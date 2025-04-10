import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-root": {
    fontSize: theme.typography.h1.fontSize,
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontSize: `${theme.typography.body1.fontSize} !important`,
  },
  "& .MuiDataGrid-cell": {
    fontSize: theme.typography.body2.fontSize,
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
