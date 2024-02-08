import { Outlet, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import CharacterCheckPage from "./components/pages/CharacterCheckPage";
import { CssBaseline } from "@mui/material";
import ScrollTop from "./components/atoms/ScrollToTop";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Toolbar from "@mui/material/Toolbar";
import ManifestCheckPage from "./components/pages/ManifestCheckPage";
import GrastaCheckPage from "./components/pages/GrastaCheckPage";
import CharacterSearchPage from "./components/pages/CharacterSearchPage";
import BuddySearchPage from "./components/pages/BuddySearchPage";
import StardreamAnalyzePage from "./components/pages/StardreamAnalyzePage";
import WhitekeyAnalyzePage from "./components/pages/WhitekeyAnalyzePage";
import LegacyAnalyzePage from "./components/pages/LegacyAnalyzePage";
import LinkPage from "./components/pages/LinkPage";
import TopBar from "./components/organisms/TopBar";
import AlignCheckPage from "./components/pages/AlignCheckPage";
import V1TablePage from "./components/pages/V1TablePage";

const router = createBrowserRouter([
  {
    element: (
      <>
        <CssBaseline />
        <TopBar />
        <Toolbar id="back-to-top-anchor" sx={{ height: 95 }} />
        <Outlet />
        <ScrollTop>
          <Fab size="small" color="secondary" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/check",
        children: [
          {
            path: "character",
            element: <CharacterCheckPage />,
          },
          {
            path: "grasta",
            element: <GrastaCheckPage />,
          },
          {
            path: "manifest",
            element: <ManifestCheckPage />,
          },
          {
            path: "staralign",
            element: <AlignCheckPage />,
          },
        ],
      },
      {
        path: "/search",
        children: [
          {
            path: "character",
            element: <CharacterSearchPage />,
          },
          {
            path: "buddy",
            element: <BuddySearchPage />,
          },
        ],
      },
      {
        path: "/analyze",
        children: [
          {
            path: "stardream",
            element: <StardreamAnalyzePage />,
          },
          {
            path: "whitekey",
            element: <WhitekeyAnalyzePage />,
          },
          {
            path: "legacy",
            element: <LegacyAnalyzePage />,
          },
          {
            path: "table",
            element: <V1TablePage />,
          },
        ],
      },
      {
        path: "/link",
        element: <LinkPage />,
      },
    ],
  },
]);

export default router;
