import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBox({nameOfSelect,menuItem,styleName}) {



  return (
    <div  className={styleName}>
    <Box sx={{ minWidth: 120 }} >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{nameOfSelect}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          key={styleName}
        >
            { menuItem && menuItem.map(item=>
                  <MenuItem value= {item.id}>{item.name}</MenuItem>
            )}  
         
        
        </Select>
      </FormControl>
    </Box>
    </div>
  );
}
