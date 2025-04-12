import {
  GridColDef,
  GridPaginationModel,
  GridSortModel,
  useGridApiRef,
} from "@mui/x-data-grid";
import { UserRoleLabels } from "../../models/Customer";
import { Customer } from "./Customer";
import ActionMenu from "../common/ActionMenu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import {
  deleteCustomer,
  fetchCustomers,
} from "../../store/actions/customerActions";
import { StyledDataGrid } from "../../theme/styles/styledDataGrid";
import { SelectChangeEvent, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import {
  setPaginationModel,
  setSortModel,
} from "../../store/reducers/customerReducers";
import {
  downloadCustomers,
  uploadCustomerFile,
} from "../../services/customerService";

const columns = (
  onDeleteCustomer: (id: number) => void,
  handleUpdateCustomer: (customer: Customer) => void
): GridColDef[] => [
  {
    field: "id",
    headerName: "Müşteri ID",
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
    field: "surname",
    headerName: "Soyisim",
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
    headerName: "Rolü",
    minWidth: 150,
    editable: false,
    valueGetter: (params) => {
      const role = params; // Role'e eriş
      return role !== undefined ? UserRoleLabels[role] : "Bilinmeyen Rol"; // Etiketi döndür
    },
  },
  {
    field: "createdOn",
    headerName: "Kayıt Tarihi",
    flex: 1,
    minWidth: 150,
    editable: false,
  },
  {
    field: "action",
    headerName: "İşlem",
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
}): { handleUpdateCustomer: (customer: Customer) => void } => {
  const apiRef = useGridApiRef();
  const dispatch = useDispatch<AppDispatch>();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const searchQuery = useSelector(
    (state: RootState) => state.customer.searchQuery
  );
  const page = useSelector((state: RootState) => state.customer.page);
  const pageSize = useSelector((state: RootState) => state.customer.pageSize);
  const sortField = useSelector((state: RootState) => state.customer.sortField);
  const sortDirection = useSelector(
    (state: RootState) => state.customer.sortDirection
  );
  const [paginationModel, setPaginationModelState] =
    useState<GridPaginationModel>({
      page: page,
      pageSize: pageSize,
    });

  useEffect(() => {
    dispatch(
      fetchCustomers({
        PageNumber: page + 1, // Backend için 1-based index
        PageSize: pageSize,
        OrderBy: sortField,
        Direction: sortDirection,
        Search: searchQuery?.length > 2 ? searchQuery : "",
      })
    );
  }, [dispatch, searchQuery, paginationModel, sortField, sortDirection]);

  const handlePaginationChange = (newModel: GridPaginationModel) => {
    setPaginationModelState(newModel);
    dispatch(
      setPaginationModel({ page: newModel.page, pageSize: newModel.pageSize })
    );
  };

  const handleSortChange = (newSortModel: GridSortModel) => {
    if (newSortModel.length > 0)
      dispatch(
        setSortModel({
          sortField: newSortModel[0].field,
          sortDirection: newSortModel[0].sort,
        })
      );
  };

  const customers = useSelector((state: RootState) => state.customer.list);
  const totalRows = useSelector(
    (state: RootState) => state.customer.totalCount
  );
  const loading = useSelector((state: RootState) => state.customer.loading);

  const handleDeleteCustomer = (id: number) => {
    dispatch(deleteCustomer(id));
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    setPaginationModelState({
      page: 0,
      pageSize: event.target.value as number,
    });
    dispatch(
      setPaginationModel({ page: 0, pageSize: event.target.value as number })
    );
  };

  const handleExport = async (format: string) => {
    try {
      const fileData = await downloadCustomers(format); // Yukarıda yazılan API çağrısı
      const contentType =
        format ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          : "text/csv";

      const extension =
        contentType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ? ".xlsx"
          : ".csv";
      const fileName = `müşteriler_${new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", "_")}${extension}`;

      // Dosyayı kaydet
      const blob = new Blob([fileData], { type: contentType });
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setUploadSuccess(false);
    setUploadError(null);

    try {
      const response = await uploadCustomerFile(file); // Call the uploadFile service
      if (response.status === 200) {
        setUploadSuccess(true);
      }
    } catch (error) {
      setUploadError("Müşteriler yüklenirken bir hata oluştu.");
    }
  };

  return (
    <>
      <StyledDataGrid
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        loading={loading}
        apiRef={apiRef}
        pagination
        columns={columns(handleDeleteCustomer, handleUpdateCustomer)}
        rows={customers}
        paginationMode="server" // Server-side pagination
        sortingMode="server" // Server-side sorting
        rowCount={totalRows ?? 0} // Total row count for pagination
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationChange}
        onSortModelChange={handleSortChange}
        rowHeight={50}
        disableColumnResize
        disableColumnMenu
        disableColumnSelector
        disableRowSelectionOnClick
        checkboxSelection={false}
        slots={{
          footer: () => CustomDataGridFooter(handlePageSizeChange),
          toolbar: () => (
            <CustomToolbar
              onExport={handleExport}
              onUpload={handleFileUpload}
            />
          ),
        }}
      />
      {/* Snackbar for success or error messages */}
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
