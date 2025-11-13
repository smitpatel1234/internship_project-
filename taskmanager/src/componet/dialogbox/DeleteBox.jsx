import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function DeleteBox({handleCloseDelete,handleDelete,open}) {

  return (
      <Dialog open={open} onClose={handleCloseDelete}>
        <DialogTitle>{"conformation alert?"}</DialogTitle>
        <DialogContent>
          <DialogContentText >
             are you sure you want to delete it .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDelete}>OK</Button>
          <Button variant="contained" onClick={handleCloseDelete}>&#10060;</Button>
        </DialogActions>
      </Dialog>
  );
}