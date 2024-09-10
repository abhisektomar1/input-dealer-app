import {
  MaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, ListItemIcon, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import PublishIcon from "@mui/icons-material/Publish";
import { lighten } from "@mui/system";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../service/AxiosInstance";

interface Props {
  enableRowActionsTrue: boolean;
  enableFacetedValues: boolean;
  enableColumnPinning: boolean;
  enableGrouping: boolean;
  enableColumnOrdering: boolean;
  enableColumnFilterModes: boolean;
  enableRowSelection: boolean;
  showColumnFilters: boolean;
  showGlobalFilter: boolean;
  columns: any[]; // Define your column types
  data: any[]; // Define your data types
  editClick?: (e: React.MouseEvent, row: any) => void;
  viewClick?: (e: React.MouseEvent, row: any) => void;
  deleteClick?: (e: React.MouseEvent, row: any) => void; 
  isView?: boolean;
  draftClick?: () => void;
  liveClick?: () => void;
  isDraft?: boolean;
  isLive?: boolean;
  isAddsupplier?: boolean;
  databstoggleViewModal?: () => void;
  databstoggleViewModal2?: () => void;
  selectedRowAction?:any;
  AddSupplier?: string;
  isAddagent?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
  addAgent?: string;
  buttonText?: string;
  buttonLink?: string;
  isbutton?: boolean;
  pagination:any;
  setPagination:any;
  rowCount:any;
}

const Table: React.FC<Props> = ({
  enableRowActionsTrue,
  enableFacetedValues,
  enableColumnPinning,
  enableGrouping,
  enableColumnOrdering,
  enableColumnFilterModes,
  enableRowSelection,
  showColumnFilters,
  showGlobalFilter,
  columns,
  data,
  editClick,
  viewClick,
  deleteClick,
  isView,
  draftClick,
  liveClick,
  isDraft,
  isLive,
  isEdit,
  isDelete,
  buttonText,
  buttonLink,
  isbutton,
  selectedRowAction,
  pagination,
  setPagination,
  rowCount
}) => {
  const handleEditClick = (e: React.MouseEvent, row: any) => {
    if (editClick) {
      editClick(e, row);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, row: any) => {
    if(deleteClick){
      deleteClick(e, row);

    }
  };

  const handleViewClick = (e: React.MouseEvent, row: any) => {
    if(viewClick){
      viewClick(e, row);
    }
  };
  const table = useMaterialReactTable({
    columns,
    data,
    createDisplayMode: "row",
    editDisplayMode: "table",
    enableColumnFilterModes: enableColumnFilterModes,
    enableColumnOrdering: enableColumnOrdering,
    enableGrouping: enableGrouping,
    enableColumnPinning: enableColumnPinning,
    enableFacetedValues: enableFacetedValues,
    enableRowActions: enableRowActionsTrue,
    enableRowSelection: enableRowSelection,
    enableFullScreenToggle: true,
    enableRowNumbers: true,
    rowNumberDisplayMode: "original",
    columnFilterDisplayMode: "custom",
    defaultColumn: {
      minSize: 50,
    },
    initialState: {
      density: 'comfortable',
      showColumnFilters: showColumnFilters,
      showGlobalFilter: showGlobalFilter,
      pagination: { pageIndex: 0, pageSize: 5 },
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    manualPagination:true,
    onPaginationChange: setPagination,
    state:{pagination},
    rowCount,
    positionToolbarAlertBanner: "bottom",
    paginationDisplayMode: "default",
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [5, 10, 15],
      shape: "rounded",
      variant: "outlined",
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      isView && (
        <MenuItem key={0} onClick={(e) => handleViewClick(e, row.original)} sx={{ m: 0 }}>
          <ListItemIcon>
            <RemoveRedEyeIcon />
          </ListItemIcon>
          View
        </MenuItem>
      ),
      isEdit && (
        <MenuItem key={1} onClick={(e) => handleEditClick(e, row.original)} sx={{ m: 0 }}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Edit
        </MenuItem>
      ),
      isDelete && (
        <MenuItem key={2} onClick={(e) => handleDeleteClick(e, row.original)} sx={{ m: 0 }}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      ),
      isDraft && (
        <MenuItem key={3} onClick={draftClick} sx={{ m: 0 }}>
          <ListItemIcon>
            <SaveAsIcon />
          </ListItemIcon>
          <span className="Declined">Draft</span>
        </MenuItem>
      ),
      isLive && (
        <MenuItem key={4} onClick={liveClick} sx={{ m: 0 }}>
          <ListItemIcon>
            <PublishIcon />
          </ListItemIcon>
          <span className="Approved">Live</span>
        </MenuItem>
      ),
    ],
    renderTopToolbar: ({ table }) => {
      const handleActivate = () => {
        selectedRowAction(table)
      };
      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: "flex",
            gap: "0.5rem",
            p: "8px",
            justifyContent: "space-between",
          })}
        >
          <Box>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              {isbutton && (
                  buttonText
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <MRT_GlobalFilterTextField table={table} />
                <MRT_ToggleFiltersButton table={table} />
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleDensePaddingButton defaultValue={4} table={table} />
                <MRT_ToggleFullScreenButton table={table} />
                <Box>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                color="success"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleActivate}
                variant="contained"
              >
                Edit Selected 
              </Button>
            </Box>
          </Box>
          </Box>
        </Box>
      );
    },
  });

  return <MaterialReactTable  table={table} />;
};

export default Table;
