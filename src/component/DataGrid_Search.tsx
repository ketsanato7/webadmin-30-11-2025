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
import {
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  Checkbox,
} from "@mui/material";
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
              placeholder="ຄົ້ນຫາ"
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
  getRowId = (row) => row.id || row._id || "",
  onRowClick,
  pageSizeOptions = [5, 10, 20],
  height = 450,
  
}) {
  return (
    <DataGrid
      rowHeight={35}
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
      columnHeaderHeight={36} // 👈 ປັບຄວາມສູງຫົວ column
      sx={{
        "& .MuiDataGrid-cell": {
          py: 0.3, // ຫຼຸດ padding ດ້ານເທິງ/ລຸ່ມ ໃນ cell
          px: 0.5, // ຫຼຸດ padding ດ້ານຂ້າງ
          fontSize: "0.85rem", // ໃຫ້ font ຂະໜາດເລັກລົງ
        },
        "& .MuiDataGrid-columnHeaders": {
          minHeight: "36px !important",
          maxHeight: "36px !important",
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "0.85rem", // ຫຼຸດ font ຂອງ header
          },
        },
        "& .MuiDataGrid-row": {
          maxHeight: "32px !important",
          minHeight: "32px !important",
        },
      }}
    />
  );
}
// components/CommonTable.jsx
export function CommonTable({ columns = [], rows = [], onRowSelect, title }) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleSelect = (row, index) => {
    setSelectedIndex(index);
    if (onRowSelect) onRowSelect(row);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200, height: 200 }} size="small">
        <TableHead>
          {/* 🔹 Title row ກິນທຸກ column */}
          <TableRow>
            <TableCell
              colSpan={columns.length + 1}
              align="center"
              sx={{ fontWeight: "bold" }}
            >
              {title}
            </TableCell>
          </TableRow>

          {/* 🔹 Column header */}
          <TableRow>
            <TableCell />
            {columns.map((col) => (
              <TableCell key={col.field} align={col.align || "center"}>
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              hover
              selected={selectedIndex === i}
              sx={{
                cursor: "pointer",
                bgcolor: selectedIndex === i ? "action.selected" : "inherit",
              }}
              onClick={() => handleSelect(row, i)}
            >
              <TableCell padding="checkbox" align="center">
                <Radio
                  checked={selectedIndex === i}
                  onChange={() => handleSelect(row, i)}
                  value={i}
                  color="primary"
                />
              </TableCell>

              {columns.map((col) => {
                const rawValue = row[col.field];
                const displayValue = col.valueFormatter
                  ? col.valueFormatter({ value: rawValue, row })
                  : rawValue;

                return (
                  <TableCell key={col.field} align={col.align || "left"}>
                    {displayValue}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const ccyFormat = (num) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num || 0);

export function CommonTableSummary({
  columns = [],
  rows = [],
  onRowSelect,
  showSummary = false,
  taxRate = 0.1, // 10% ເປັນຄ່າຕັ້ງຕົ້ນ
}) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleSelect = (row, index) => {
    setSelectedIndex(index);
    if (onRowSelect) onRowSelect(row);
  };

  // ✅ ຄຳນວນລວມຕົວເລກຈາກຄ່າໃນ column ທີ່ຊື່ "total"
  const invoiceSubtotal = React.useMemo(() => {
    return rows.reduce((sum, row) => sum + (Number(row.total) || 0), 0);
  }, [rows]);

  const invoiceTaxes = invoiceSubtotal * taxRate;
  const invoiceTotal = invoiceSubtotal + invoiceTaxes;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small">
        {/* 🔹 Header */}
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((col) => (
              <TableCell key={col.field} align={col.align || "left"}>
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* 🔹 Body */}
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              hover
              selected={selectedIndex === i}
              sx={{
                cursor: "pointer",
                bgcolor: selectedIndex === i ? "action.selected" : "inherit",
              }}
              onClick={() => handleSelect(row, i)}
            >
              <TableCell padding="checkbox" align="center">
                <Radio
                  checked={selectedIndex === i}
                  onChange={() => handleSelect(row, i)}
                  value={i}
                  color="primary"
                />
              </TableCell>

              {columns.map((col) => {
                const rawValue = row[col.field];
                const displayValue = col.valueFormatter
                  ? col.valueFormatter({ value: rawValue, row })
                  : rawValue;
                return (
                  <TableCell key={col.field} align={col.align || "left"}>
                    {displayValue}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}

          {/* 🔹 Summary Rows (optional) */}
          {showSummary && (
            <>
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={columns.length - 2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">
                  {(taxRate * 100).toFixed(0)} %
                </TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={columns.length - 1}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
} // ฟอร์แมตตัวเลข

export function CommonTableCheckbox({
  columns = [],
  rows = [],
  onRowSelect,
  showSummary = false,
  taxRate = 0.1,
}) {
  const [selectedIndexes, setSelectedIndexes] = React.useState([]);
  const ccyFormat = (num) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num || 0);

  const handleToggle = (row, index) => {
    const updated = selectedIndexes.includes(index)
      ? selectedIndexes.filter((i) => i !== index)
      : [...selectedIndexes, index];

    setSelectedIndexes(updated);

    if (onRowSelect) {
      const selectedRows = updated.map((i) => rows[i]);

      const loanAmounts = selectedRows.map((r) =>
        Number(r.loan_amount ?? r.loanAmount ?? 0)
      );

      const serviceFees = selectedRows.map((r) => {
        const loan = Number(r.loan_amount ?? r.loanAmount ?? 0);
        const rate = Number(r.fee_rate ?? 0);
        return (loan * rate) / 100;
      });

      onRowSelect({
        selectedRows,
        loanAmounts,
        serviceFees,
      });
    }
  };

  const invoiceSubtotal = React.useMemo(() => {
    return rows.reduce((sum, row) => sum + Number(row.total ?? 0), 0);
  }, [rows]);

  const invoiceTaxes = invoiceSubtotal * taxRate;
  const invoiceTotal = invoiceSubtotal + invoiceTaxes;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((col) => (
              <TableCell key={col.field} align={col.align || "left"}>
                {col.headerName}
              </TableCell>
            ))}
            <TableCell align="center">ຄ່າບໍລິການ</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, i) => {
            const loan = Number(row.loan_amount ?? row.loanAmount ?? 0);
            const rate = Number(row.fee_rate ?? 0);
            const service_fee = (loan * rate) / 100;

            return (
              <TableRow
                key={i}
                hover
                selected={selectedIndexes.includes(i)}
                sx={{
                  cursor: "pointer",
                  bgcolor: selectedIndexes.includes(i)
                    ? "action.selected"
                    : "inherit",
                }}
                onClick={() => handleToggle(row, i)}
              >
                <TableCell padding="checkbox" align="center">
                  <Checkbox
                    checked={selectedIndexes.includes(i)}
                    onChange={() => handleToggle(row, i)}
                  />
                </TableCell>

                {columns.map((col) => {
                  const value = row[col.field];
                  return (
                    <TableCell key={col.field} align={col.align || "left"}>
                      {value}
                    </TableCell>
                  );
                })}

                <TableCell align="right">{service_fee.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}

          {showSummary && (
            <>
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={columns.length - 1}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">
                  {(taxRate * 100).toFixed(0)}%
                </TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={columns.length}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
