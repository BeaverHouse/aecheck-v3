import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import useConfigStore from "./store/useConfigStore";
import { darkPalette, lightPalette } from "./constants/theme";
import GlobalModal from "./components/molecules/GlobalModal";
import useModalStore from "./store/useModalStore";
import "./index.css";
import { ThemeOptions } from "./constants/enum";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { getNumber } from "./util/func";
import useCheckStore from "./store/useCheckStore";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function App() {
  const { theme } = useConfigStore();
  const { t } = useTranslation();
  const { loadSaveData } = useCheckStore();
  const { modalType } = useModalStore();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
      },
    },
  });

  const migrate = async () => {
    const oldData = window.localStorage.getItem("AE_CHECK");
    if (!oldData || oldData.length < 1) return;
    Swal.fire({
      title: "Data Migration",
      html: `<p style="font-size: 14px;">${t("frontend.message.migrate")}</p>`,
      width: 300,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const newData: CheckStateV4 = JSON.parse(oldData).state;
          if (!newData.buddy) {
            const charIds = newData.inven.map(
              (i) => `char${String(i).padStart(4, "0")}`
            );
            const body = {
              characterIds: charIds,
            };
            const res = await fetch(
              `${import.meta.env.VITE_API_URL}/buddy/partners`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
              }
            );
            const buddyList = (
              (await res.json()) as APIResponse<IDInfo[]>
            ).data.map((i) => getNumber(i));

            newData.buddy = buddyList;
          }
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
            window.localStorage.removeItem("AE_CHECK");
            window.location.reload();
          });
        } catch {
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
      }
    });
  };

  useEffect(() => {
    if (t("frontend.message.migrate") !== "frontend.message.migrate") migrate();
  }, []);

  const selectedTheme = createTheme({
    palette: theme === ThemeOptions.dark ? darkPalette : lightPalette,
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={selectedTheme}>
        <GlobalModal type={modalType} />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
