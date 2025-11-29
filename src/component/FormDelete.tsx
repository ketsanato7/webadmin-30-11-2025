import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material"; 
import { Cancel ,Delete} from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import Dailog from "./dailog";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export default function FormWrapper({ title, children }: FormWrapperProps) {
  const [open, setOpen] = useState(false);

  return (
    <>

      <>      <IconButton color="error" onClick={() => setOpen(true)} >
        <Delete />
      </IconButton>
      </>
      <Dialog
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
        PaperComponent={Dailog}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Delete  {title}
        </DialogTitle>

        <IconButton
          color="error"
          onClick={() => setOpen(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Cancel />
        </IconButton>

        <DialogContent dividers>
          <Box>{children}</Box>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </>
  );
}
