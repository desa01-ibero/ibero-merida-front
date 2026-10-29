import { IconButton, Menu, MenuItem, Pagination, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import { useState, useMemo, useCallback } from "react";
import { useResponsiveColumns } from "../hooks/useResponsiveColumns";
import { StyledDataGridBox } from "./StyledDataGridBox";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#000000" },
    },
  },
  esES,
);

// Componente Toolbar de búsqueda rápida nativa de MUI DataGrid
function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 2,
        pb: 1,
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <GridToolbarQuickFilter
        placeholder="Buscar..."
        variant="outlined"
        size="small"
        sx={{
          width: 350,
          "& .MuiInputBase-root": {
            fontSize: "14px",
            fontFamily: "Oxygen, sans-serif",
            backgroundColor: "#ffffff",
          },
        }}
      />
    </Box>
  );
}

function CustomPagination({ paginationModel, onPaginationModelChange, rows }) {
  const page = paginationModel.page || 0;
  const pageSize = paginationModel.pageSize || 10;
  const pageCount = Math.ceil(rows.length / pageSize);

  return (
    <Pagination
      count={pageCount}
      page={page + 1}
      onChange={(event, value) =>
        onPaginationModelChange({ ...paginationModel, page: value - 1 })
      }
      color="primary"
    />
  );
}

export const GeneralDataTable = ({
  rows = [],
  columns = [],
  actions = [],
  columnsHide,
  rowsPerPage = 8,
  getRowId = (row) => row.id,
  noRowsText = "Sin registros",
  disableActionsColumn = false,
}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = useCallback((event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setSelectedRow(null);
  }, []);

  const handleMenuAction = useCallback(
    (action) => {
      if (!selectedRow) return;
      action.onClick(selectedRow);
      handleMenuClose();
    },
    [selectedRow, handleMenuClose],
  );

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: rowsPerPage,
  });

  // columnas adaptadas a responsive
  const responsiveColumns = useResponsiveColumns(columns);

  // columnas con acciones (solo si hay)
  const finalColumns = useMemo(() => {
    const cols = [...responsiveColumns];
    if (actions.length > 0) {
      cols.push({
        key: "acciones",
        field: "acciones",
        headerName: "",
        width: 80,
        minWidth: 80,
        headerAlign: "center",
        align: "center",
        sortable: false,
        filterable: false,
        headerClassName: "super-app-theme--header",
        disableColumnMenu: true,
        renderCell: (params) => {
          const availableActions = actions.filter(
            (action) => !action.condition || action.condition(params.row),
          );
          if (availableActions.length === 0) return null;
          return (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                handleMenuClick(event, params.row);
              }}
              style={{ color: '#1F263E' }}
            >
              <MoreHorizIcon />
            </IconButton>
          );
        },
      });
    }
    return cols;
  }, [responsiveColumns, actions, handleMenuClick]);

  const rowPerPage = [5, 10, 20, 50];

  return (
    <>
      <StyledDataGridBox>
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={rows}
            columns={finalColumns}
            pageSizeOptions={rowPerPage}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            getRowId={getRowId}
            columnVisibilityModel={columnsHide}
            scrollbarSize={10}
            disableColumnResize
            disableColumnMenu
            style={{ width: "100%", maxWidth: "100%" }}
            localeText={{ noRowsLabel: noRowsText }}
            hideFooterSelectedRowCount
            onRowDoubleClick={
              actions.length > 0
                ? (params, event) => {
                  const availableActions = actions.filter(
                    (action) =>
                      !action.condition || action.condition(params.row),
                  );
                  if (availableActions.length > 0) {
                    event.defaultMuiPrevented = true;
                    handleMenuClick(event, params.row);
                  }
                }
                : undefined
            }
            slots={{
              toolbar: QuickSearchToolbar,
              pagination: (props) => (
                <CustomPagination
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  rows={rows}
                />
              ),
            }}
          />
        </ThemeProvider>
      </StyledDataGridBox>

      {actions.length > 0 && (
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "#EFEFF9 !important",
              color: "#595F73 !important",
              boxShadow: "0px 4px 10px rgba(31, 38, 62, 0.1) !important",
            }
          }}
        >
          {actions
            .filter(
              (action) =>
                !action.condition ||
                (selectedRow && action.condition(selectedRow)),
            )
            .map((action) => (
              <MenuItem
                key={action.key}
                onClick={() => handleMenuAction(action)}
                sx={{
                  color: "#595F73 !important",
                  fontSize: "14px",
                  fontWeight: 500,
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  "& svg": {
                    color: "#595F73 !important",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(31, 38, 62, 0.05) !important",
                  },
                  ...action.sx
                }}
              >
                {action.icon} {action.label}
              </MenuItem>
            ))}
        </Menu>
      )}
    </>
  );
};
