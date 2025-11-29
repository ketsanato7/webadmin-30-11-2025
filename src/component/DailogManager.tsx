import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Save, Clear, Cancel, Add } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dailog from "./dailog";
import css from "../style.module.css";

/**
 * ✅ Reusable LoanDialog component
 * - Accepts schema validation (Zod)
 * - Works with react-hook-form
 * - Can inject custom form fields via children
 * - Can be controlled externally with open/setOpen or internally
 */
export default function LoanDialog({
  title = "Insert Loan",
  schema,
  defaultValues = {},
  open: externalOpen,
  setOpen: externalSetOpen,
  onSubmit: externalOnSubmit,
  hideButton = false,
  buttonText = "ສ້າງສັນຍາເງິນກູ້",
  children,
}) {
  // ✅ Internal or external state
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = externalOpen ?? internalOpen;
  const setOpen = externalSetOpen ?? setInternalOpen;

  // ✅ Setup react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  });

  // ✅ handleSubmit
  const handleFormSubmit = async (data) => {
    try {
      if (externalOnSubmit) {
        await externalOnSubmit(data);
      } else {
        toast.success("Form submitted successfully!");
        console.log("Submitted data:", data);
      }
      reset();
      setOpen(false);
    } catch (err) {
      toast.error(err.message || "Error submitting form");
    }
  };

  return (
    <>
      {!hideButton && (
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          {buttonText}
        </Button>
      )}

      <Dialog
        maxWidth="lg"
        open={open}
        onClose={() => setOpen(false)}
        PaperComponent={dailog}
      >
        <DialogTitle sx={{ cursor: "move" }}>{title}</DialogTitle>

        <IconButton
          color="error"
          onClick={() => setOpen(false)}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Cancel />
        </IconButton>

        <DialogContent dividers>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Box sx={{ flexGrow: 1 }}>
              {children && children({ control, errors, setValue, watch })}
            </Box>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              className={css.ContorllerTexBox}
              mt={2}
            >
              <Button variant="contained" type="submit" startIcon={<Save />}>
                Insert
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => reset()}
                startIcon={<Clear />}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpen(false)}
                startIcon={<Cancel />}
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </>
  );
}
