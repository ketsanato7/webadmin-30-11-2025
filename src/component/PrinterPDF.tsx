import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import {
  Box,
  Button,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import dayjs from "dayjs";
export default function PrintableReport({ title = "ລາຍງານຂໍ້ມູນ", columns = [], rows = [] }) {
  const printRef = useRef();

  return (
    <Box>
      {/* 🔘 ປຸ່ມພິມ */}
      <ReactToPrint
        trigger={() => (
          <Button
            variant="contained"
            color="primary"
            startIcon={<PrintIcon />}
            sx={{ mb: 2 }}
          >
            ພິມເອກະສານ / PDF
          </Button>
        )}
        content={() => printRef.current}
        documentTitle={title}
        pageStyle={`
          @page {
            size: A4 portrait;
            margin: 1.5cm;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-family: 'Noto Sans Lao', sans-serif;
          }
        `}
      />

      {/* 🧾 ສ່ວນເນື້ອໃນທີ່ຈະພິມ */}
      <Box ref={printRef} sx={{ p: 2 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            ບໍລິສັດ ອິນໂຟເຕັກ ຈໍາກັດ
          </Typography>
          <Typography variant="body2">ເລກທີ່ 01, ຖະໜົນ ຟ້າທາວົງ, ນະຄອນຫຼວງວຽງຈັນ</Typography>
          <Typography variant="body2">ໂທ: 021-123456 | ອີເມວ: info@infotech.la</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">
            ວັນທີ: {dayjs().format("DD/MM/YYYY HH:mm")}
          </Typography>
        </Box>

        {/* ຕາຕະລາງຂໍ້ມູນ */}
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                {columns.map((col) => (
                  <TableCell key={col.field} align={col.align || "left"}>
                    <strong>{col.headerName}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={col.field} align={col.align || "left"}>
                      {col.valueFormatter
                        ? col.valueFormatter({ value: row[col.field], row })
                        : row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ສະຫຼຸບ */}
        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Typography variant="body2">
            ຈໍານວນລາຍການ: <strong>{rows.length}</strong>
          </Typography>
        </Box>

        {/* ລາຍເຊັນ */}
        <Box
          sx={{
            mt: 5,
            display: "flex",
            justifyContent: "space-between",
            px: 6,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2">ຜູ້ຈັດທຳ</Typography>
            <Box sx={{ height: 60 }} />
            <Typography variant="body2" sx={{ borderTop: "1px solid #000", width: 150, mx: "auto" }}>
              (ລາຍເຊັນ)
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2">ຜູ້ອະນຸມັດ</Typography>
            <Box sx={{ height: 60 }} />
            <Typography variant="body2" sx={{ borderTop: "1px solid #000", width: 150, mx: "auto" }}>
              (ລາຍເຊັນ)
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}