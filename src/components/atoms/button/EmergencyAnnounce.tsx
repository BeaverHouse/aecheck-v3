import { useQuery } from "@tanstack/react-query";
import { LanguageOptions } from "../../../constants/enum";
import { useTranslation } from "react-i18next";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function EmergencyAnnounce() {
  const { i18n } = useTranslation();
  const { isPending, data, error } = useQuery<AnnouncementData, Error>({
    queryKey: ["emergencyAnnounce"],
    queryFn: () =>
      fetch("https://announce.haulrest.me/api/history/latest/emergency").then(
        (res) => {
          if (res.ok) return res.json();
          else if (res.status === 404)
            return {
              announceContentCode: -1,
              koreanDescription: "",
              englishDescription: "",
              title: "",
            };
          else throw new Error("Failed to fetch announce");
        }
      ),
    throwOnError: true,
  });

  if (isPending || error || data.announceContentCode === -1) return null;

  const description =
    i18n.language === LanguageOptions.ko
      ? data.koreanDescription
      : data.englishDescription;
  return (
    <Alert
      variant="filled"
      severity="error"
      sx={{ maxWidth: "400px", margin: "0 auto", textAlign: "left" }}
    >
      <AlertTitle>{data.title}</AlertTitle>
      <div style={{ whiteSpace: "pre-line" }}>{description}</div>
    </Alert>
  );
}

export default EmergencyAnnounce;
