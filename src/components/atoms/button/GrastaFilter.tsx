import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useFilterStore from "../../../store/useFilterStore";

function GrastaFilterButton() {
  const { grastaStatusFilter, setGrastaStatusFilter } = useFilterStore();

  return (
    <ToggleButtonGroup
      color="primary"
      size="small"
      value={grastaStatusFilter}
      onChange={(_, v) => setGrastaStatusFilter(v as number[])}
      sx={{ m: 0.8 }}
    >
      {[0, 1, 2].map((option) => (
        <ToggleButton key={option} value={option} sx={{ p: 0.28 }}>
          <img
            src={`${import.meta.env.VITE_CDN_URL}/icon/grasta${option}.png`}
            alt={`${option}`}
            width={33}
            height={33}
          />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default GrastaFilterButton;
