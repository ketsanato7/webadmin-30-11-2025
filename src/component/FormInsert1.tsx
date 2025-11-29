import {ReactNode} from "react"
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Save, Cancel, Add, Clear } from "@mui/icons-material";
import {
  Button,
  Stack,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import Dailog from "./dailog";

import css from "../../src/style.module.css";

import { ToastContainer, toast } from "react-toastify"; 
type FormWapperProps={
    title:string;
    children:ReactNode
}
export  default function FormWrapper({title,children}):FormWapperProps{
  const [open, setOpen] = React.useState(false);


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
                 fullWidth={true}
                open={open}
                onClose={handleClose}
                PaperComponent={Dailog}
                aria- ="draggable-dialog-title"
              >
                <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
      Insert  {title}
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
              
                   <Box >

        {children}


      
    </Box>



          
                </DialogContent>
              </Dialog>
              <ToastContainer />
        
        </>
    )

}