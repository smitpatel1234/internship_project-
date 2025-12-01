
import * as React  from "react";
import {
  OutlinedInput,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";

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

export default function MultipleSelectCheckmarks({
  value,
  name,
  children,
  onHandelChangeOnView,
  disabled,
  userList = [],
  projectId = null,
  mappingList = [],
}) {
  const [selected, setSelected] = React.useState(value);


  React.useEffect(() => {
    if (projectId && Array.isArray(value) && value.length === 0) {
      const initial = mappingList
        .filter((m) => m.projectId === projectId)
        .map((m) => m.userId);
      if (initial.length) {
        setSelected(initial);
     
        onHandelChangeOnView({ target: { value: initial } });
      }
    }
  }, []);

  React.useEffect(() => {
    if (Array.isArray(value)) setSelected(value);
  }, [value]);

  const handleChange = (event) => {
    const {
      target: { value: rawValue },
    } = event;
    const newSelected = typeof rawValue === "string" ? rawValue.split(",") : rawValue;
    setSelected(newSelected);
    onHandelChangeOnView({ target: { value: newSelected } });
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }} disabled={disabled}>
      <InputLabel>{name}</InputLabel>
      <Select
        multiple
        required
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label={name} />}
        renderValue={(selected) =>
          selected
            .map((userId) => {
              const user = userList.find((u) => u.id === userId);
              return user?.username;
            })
            .filter(Boolean)
            .join(", ")
        }
        MenuProps={MenuProps}
      >
        {children}
      </Select>
    </FormControl>
  );
}
