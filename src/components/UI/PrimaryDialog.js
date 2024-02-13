import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { DialogContent } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PrimaryDialog({ open, setOpen, children }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            height: "500px",
            overflowY: "auto",
            width: "90%",
            backgroundColor: "transparent",
            boxShadow: "unset",
          },
        },
      }}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
