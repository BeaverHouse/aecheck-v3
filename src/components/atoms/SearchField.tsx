import React from "react";
import TextField from "@mui/material/TextField";
import useFilterStore from "../../store/useFilterStore";

interface SearchBoxInfo {
  label: string;
}

const SearchField: React.FC<SearchBoxInfo> = ({ label }) => {
  const { searchWord, setSearch } = useFilterStore();

  return (
    <TextField
      sx={{ m: 0.3 }}
      label={label}
      type="search"
      size="small"
      color="secondary"
      value={searchWord}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchField;
