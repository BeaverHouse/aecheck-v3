import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
          variant="outlined"
          color="secondary"
          sx={{ width: 250, mb: 1.5, display: "flex" }}
          aria-label={data.label}
          href={data.link}
          target="_blank"
          rel="noreferrer"
        >
          <Avatar
            src={`/image/icon/${data.label}.jpg`}
            sx={{ width: 50, height: 50, mr: 1 }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {data.desc}
          </Typography>
        </Button>
      ))}
      <Typography variant="subtitle1">e-mail : haulrest@gmail.com</Typography>
    </Box>
  );
}

export default LinkPage;
