// 📌 FormWrapper.tsx
import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import { Cancel, Edit } from "@mui/icons-material";
import Dailog from "./dailog";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
  onClose?: () => void;
};

export default function FormWrapper({ title, children, onClose }: FormWrapperProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton color="info" onClick={() => setOpen(true)} >
        <Edit />
      </IconButton>

      <Dialog
        maxWidth="sm"
        open={open}
        onClose={onClose || handleClose}
        PaperComponent={Dailog}
      >
        <DialogTitle id="draggable-dialog-title" sx={{ cursor: "move" }}>
          {title}
        </DialogTitle>

        <IconButton
          color="error"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Cancel />
        </IconButton>

        <DialogContent dividers>
          <Box>{children}</Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
