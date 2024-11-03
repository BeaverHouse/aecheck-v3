import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BuyMeACoffeeButton from "../atoms/button/Coffee";
import EmailIcon from "@mui/icons-material/Email";

const LinkData = [
  {
    link: "https://anothereden.wiki",
    label: "wiki",
    desc: "Another Eden Wiki",
  },
  {
    link: "https://altema.jp",
    label: "altema",
    desc: "altema.jp",
  },
  {
    link: "https://anothereden.game-info.wiki",
    label: "seesaa",
    desc: "Seesaa Wiki (JP)",
  },
  {
    link: "https://anaden-yakata.jp",
    label: "yakata",
    desc: "anaden-yakata.jp (アナデンの館)",
  },
  {
    link: "https://github.com/BeaverHouse/aecheck-v3",
    label: "github",
    desc: "GitHub",
  },
];

function LinkPage() {
  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {LinkData.map((data) => (
        <Button
          key={data.label}
          variant="outlined"
          color="secondary"
          sx={{ width: "100%", maxWidth: 400, mb: 1.5, display: "flex" }}
          aria-label={data.label}
          href={data.link}
          target="_blank"
          rel="noreferrer"
        >
          <Avatar
            src={`${import.meta.env.VITE_CDN_URL}/icon/${data.label}.jpg`}
            sx={{ width: 50, height: 50, mr: 1 }}
          />
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {data.desc}
          </Typography>
        </Button>
      ))}
      <BuyMeACoffeeButton />
      <Button
        variant="contained"
        color="secondary"
        sx={{ width: 200, pl: 3, display: "flex" }}
        href="mailto:haulrest@gmail.com"
        startIcon={<EmailIcon />}
      >
        <Typography variant="body1" fontWeight="bold" sx={{ flexGrow: 1 }}>
          Report (e-mail)
        </Typography>
      </Button>
    </Box>
  );
}

export default LinkPage;
