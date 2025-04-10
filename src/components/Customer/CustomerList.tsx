import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomer } from "../../store/features/customer/customerSlice";
import { AppDispatch, RootState } from "../../store/store";
import { Customer as CustomerType } from "./Customer";
import AddCustomer from "./AddCustomer";
import "./CustomerList.scss";
import { toast } from "react-toastify";
import { DataGrid, GridColDef, GridPaginationModel, useGridApiRef } from "@mui/x-data-grid";
import { StyledDataGrid } from "../../theme/styles/styledDataGrid";
import { Alert, Snackbar } from "@mui/material";
import { Customer, UserRoleLabels } from "../../models/Customer";
import ActionMenu from "../common/ActionMenu";

const columns = (
  onDeleteCustomer: (id: number) => void,
  handleUpdateCustomer: (customer: CustomerType) => void
): GridColDef[] => [
  {
    field: "id",
    headerName: "MüşteriID",
    width: 100,
    editable: false,
  },
  {
    field: "name",
    headerName: "İsim",
    minWidth: 130,
    editable: false,
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 180,
    editable: false,
  },
  {
    field: "phone",
    headerName: "Telefon",
    flex: 1,
    minWidth: 150,
    editable: false,
  },
  {
    field: "address",
    headerName: "Adres",
    flex: 1,
    minWidth: 180,
    editable: false,
  },
  {
    field: "taxNumber",
    headerName: "Vergi No",
    flex: 1,
    minWidth: 180,
    editable: false,
  },
  {
    field: "role",
    headerName: "Rol",
    flex: 1,
    minWidth: 180,
    editable: false,
    valueGetter: (params) => {
      const role = params;
      return role !== undefined ? UserRoleLabels[role] : "Bilinmeyen Rol";
    },
  },
  {
    field: "actions",
    headerName: "İşlemler",
    headerAlign: "right",
    align: "right",
    editable: false,
    sortable: false,
    flex: 1,
    renderCell: (params) => {
      const actionItems = [
        {
          id: 1,
          icon: "mdi:update",
          title: "Güncelle",
          action: () => handleUpdateCustomer(params.row),
        },
        {
          id: 2,
          icon: "mdi:delete",
          title: "Sil",
          action: () => onDeleteCustomer(params.row.id),
        },
      ];
      return <ActionMenu actions={actionItems} />;
    },
  },
];

const CustomerList = ({
  handleUpdateCustomer,
}: {
  handleUpdateCustomer: (customer: Customer) => void;
}) => {
  const apiRef = useGridApiRef();
  const dispatch = useDispatch<AppDispatch>();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const searchQuery = useSelector(
    (state: RootState) => state.customer.meta.searchQuery
  );
  const page = useSelector((state: RootState) => state.customer.meta.page);
  const pageSize = useSelector(
    (state: RootState) => state.customer.meta.pageSize
  );
  const sortField = useSelector(
    (state: RootState) => state.customer.meta.sortField
  );
  const sortDirection = useSelector(
    (state: RootState) => state.customer.meta.sortDirection
  );
  const [paginationModel, setPaginationModelState] =
    useState<GridPaginationModel>({
      page: page,
      pageSize: pageSize,
    });

  useEffect(()=>{
    dispatch(
      fetchCustomers({
        PageNumber:page,
        PageSize:pageSize,
        OrderBy:sortField,
        Direction:sortDirection,
        Search:searchQuery?.length > 2 ? searchQuery :"",
      })
    )
  },[dispatch,searchQuery,paginationModel,sortField,sortDirection])

  return (
    <>
      <StyledDataGrid
        rows={customers}
        columns={columns(handleDeleteCustomer, handleUpdateCustomer)}
        loading={loading}
        pagination
        paginationMode="server"
        sortingMode="server"
        rowCount={totalCount}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onSortModelChange={handleSortChange}
        paginationModel={paginationModel}
        rowHeight={50}
        disableColumnResize
        disableColumnMenu
        disableRowSelectionOnClick
        disableColumnSelector
        checkboxSelection={false}
        slots={{
          footer: () => CustomDataGridFooter(handlePageSizeCharge),
          toolbar: () => (
            <CustomToolbar
              onExport={handleExport}
              onUpload={handleFileUpload}
            />
          ),
        }}
      />
      <Snackbar
        open={uploadSuccess}
        autoHideDuration={6000}
        onClose={() => setUploadSuccess(false)}
      >
        <Alert onClose={() => setUploadSuccess(false)} severity="success">
          Dosya başarıyla yüklendi!
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(uploadError)}
        autoHideDuration={6000}
        onClose={() => setUploadError(null)}
      >
        <Alert onClose={() => setUploadError(null)} severity="error">
          {uploadError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomerList;
