import Modal from "@mui/material/Modal";
import React from "react";
import useModalStore from "../../store/useModalStore";
import { useTranslation } from "react-i18next";
import useCheckStore from "../../store/useCheckStore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  fontWeight: 800,
  p: 1,
};

function DataLoaderModal() {
  const { modalInfo, hideModal } = useModalStore();
  const { inven, grasta, manifest, staralign, loadSaveData } = useCheckStore();
  const { t } = useTranslation();

  const [Text, setText] = React.useState(() =>
    JSON.stringify({
      inven: inven,
      grasta: grasta,
      manifest: manifest,
      staralign: staralign,
    })
  );

  const loadData = () => {
    try {
      const newData: CheckValueState = JSON.parse(Text.trim());
      loadSaveData(newData);
      Swal.fire({
        text: "Data Load Success",
        width: 280,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        customClass: {
          popup: "alert",
        },
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "Data Load Error",
        width: 280,
        timer: 1000,
        showConfirmButton: false,
        timerProgressBar: true,
        customClass: {
          popup: "alert",
        },
      });
    }
  };

  return (
    <Modal open={modalInfo === "DATALOADER"} onClose={hideModal}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
          {t("frontend.menu.loader")}
        </Typography>
        <Typography variant="subtitle2" sx={{ textAlign: "center", mb: 1 }}>
          {t("frontend.menu.loader.description")}
        </Typography>
        <TextField
          multiline
          maxRows={10}
          sx={{ width: "100%", mt: 1, mb: 1 }}
          value={Text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          variant="contained"
          color="warning"
          sx={{ width: "100%", mt: 1, mb: 1 }}
          onClick={loadData}
        >
          LOAD
        </Button>
      </Box>
    </Modal>
  );
}

export default DataLoaderModal;
