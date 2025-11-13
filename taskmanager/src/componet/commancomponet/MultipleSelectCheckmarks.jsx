import * as React from "react";
import {
  OutlinedInput,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./SelectBox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({ value, name, children ,onHandelChangeOnView , disabled }) {
  return (
    <ThemeProvider theme={theme}>
      <FormControl sx={{ m: 1, width: 300 }}  onClick={(e) => e.preventDefault()} >
        <InputLabel>{name}</InputLabel>
        <Select
          multiple
          value={value}
          input={<OutlinedInput label={name} />}
          renderValue={(selected) => selected.join(", ")} 
          MenuProps={MenuProps}
          onChange={onHandelChangeOnView}
          disabled={disabled}
         onClick={(e) => e.preventDefault()}
        >
          {children}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}
