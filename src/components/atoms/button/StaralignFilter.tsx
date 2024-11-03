import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useFilterStore from "../../../store/useFilterStore";

function StaralignFilterButton() {
  const { staralignStatusFilter, setStaralignStatusFilter } = useFilterStore();

  return (
    <ToggleButtonGroup
      color="primary"
      size="small"
      value={staralignStatusFilter}
      onChange={(_, v) => setStaralignStatusFilter(v as number[])}
      sx={{ m: 0.8 }}
    >
      {[0, 1, 2, 3].map((option) => (
        <ToggleButton key={option} value={option}>
          {`${option}/3`}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default StaralignFilterButton;
