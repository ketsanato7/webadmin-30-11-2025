
import * as React from "react";
import {
  DataGrid,
      GridToolbarContainer,
  GridToolbarExport,
  QuickFilter,
  QuickFilterClear,
  QuickFilterControl,
  QuickFilterTrigger,
  Toolbar,
  ToolbarButton,
} from "@mui/x-data-grid";
import { InputAdornment, TextField, Tooltip, Typography, Box } from "@mui/material";
import styled from "@emotion/styled";

// ====================== Custom Toolbar ======================
const StyledQuickFilter = styled(QuickFilter)({
  display: "grid",
  alignItems: "center",
  marginLeft: "auto",
});

const StyledToolbarButton = styled(ToolbarButton)(({ theme, ownerState }) => ({
  gridArea: "1 / 1",
  width: "min-content",
  height: "min-content",
  zIndex: 1,
  opacity: ownerState.expanded ? 0 : 1,
  pointerEvents: ownerState.expanded ? "none" : "auto",
  transition: theme.transitions.create(["opacity"]),
}));

const StyledTextField = styled(TextField)(({ theme, ownerState }) => ({
  gridArea: "1 / 1",
  overflowX: "clip",
  width: ownerState.expanded ? 260 : "var(--trigger-width)",
  opacity: ownerState.expanded ? 1 : 0,
  transition: theme.transitions.create(["width", "opacity"]),
}));

function CustomToolbar({ title }) {
  return (
    <Toolbar>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {title || "Data Table"}
      </Typography>

      <StyledQuickFilter defaultExpanded>
        
        <QuickFilterTrigger
          render={(triggerProps, state) => (
            <Tooltip title="Search" enterDelay={0}>
              <StyledToolbarButton
                {...triggerProps}
                ownerState={{ expanded: state.expanded }}
                color="default"
                aria-disabled={state.expanded}
              />
            </Tooltip>
          )}
        />
        <QuickFilterControl
          render={({ ref, ...controlProps }, state) => (
            <StyledTextField
              {...controlProps}
              ownerState={{ expanded: state.expanded }}
              inputRef={ref}
              aria-label="Search"
              placeholder="Search..."
              size="small"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start" />,
                  endAdornment: state.value ? (
                    <InputAdornment position="end">
                      <QuickFilterClear
                        edge="end"
                        size="small"
                        aria-label="Clear search"
                        material={{ sx: { marginRight: -0.75 } }}
                      />
                    </InputAdornment>
                  ) : null,
                },
              }}
            />
          )}
        />
      </StyledQuickFilter>

      <GridToolbarContainer sx={{ marginLeft: 2 }}>
        <GridToolbarExport />
      </GridToolbarContainer>
    </Toolbar>
  );
}

// ====================== Reusable DataGrid ======================
export default function ReusableDataGrid({
  title,
  rows = [],
  columns = [],
  getRowId=(row) => row.id||row._id||"",
    onRowClick,
  pageSizeOptions = [5, 10, 20],
  height = 450,
}) {


  return (
      <DataGrid
        style={{ height }}
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        onRowClick={onRowClick}
        slots={{
          toolbar: () => <CustomToolbar title={title} />,
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: pageSizeOptions[0] } },
        }}
        showToolbar
        pageSizeOptions={pageSizeOptions}
      />
  );
}
