import { ReactNode } from "react";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Save, Cancel, Add, Clear } from "@mui/icons-material";
import { Button, Stack, IconButton } from "@mui/material";
import Dailog from "./dailog";
import css from "../../../../style.module.css";

import { ToastContainer, toast } from "react-toastify";
type FormWapperProps = {
  title: string;
  children: ReactNode;
};
export function FormWrapper({ title, children }): FormWapperProps {
  const [open, setOpen] = React.useState(false);

  const form1 = React.useRef();

  const handleClickOpenInsert = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="outlined"
        sx={{ width: "10ch" }}
        type="submit"
        startIcon={<Add />}
        onClick={handleClickOpenInsert}
      >
        Add
      </Button>

      <Dialog
        maxWidth="sx"
        open={open}
        onClose={handleClose}
        PaperComponent={Dailog}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Insert {title}
        </DialogTitle>
        <IconButton
          aria-label="fingerprint"
          color="error"
          onClick={handleClose}
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
          <Stack
            spacing={{ xs: 1, sm: 1, p: 1 }}
            direction="row"
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            {children}
          </Stack>
          <br />

          <Stack
            spacing={{ xs: 1, sm: 1, p: 1 }}
            direction="row"
            useFlexGap
            sx={{ flexWrap: "wrap", justifyContent: "center" }}
            className={css.ContorllerTexBox}
          >
            <Button
              variant="contained"
              sx={{ width: "25ch" }}
              type="submit"
              startIcon={<Save />}
            >
              Insert
            </Button>
            <Button
              variant="contained"
              sx={{ width: "25ch" }}
              startIcon={<Clear />}
              type="reset"
            >
              Clear
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
}
