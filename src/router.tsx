import { Outlet, createBrowserRouter } from "react-router-dom";
import ScrollTop from "./components/atoms/button/ScrollTop";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Toolbar from "@mui/material/Toolbar";
import AECheckMenu from "./components/organisms/Menu";
import HomePage from "./components/pages/Home";
import CheckPage from "./components/pages/Check";
import SearchPage from "./components/pages/Search";
import AnalysisPage from "./components/pages/Analysis";
import LinkPage from "./components/pages/Link";
import CssBaseline from "@mui/material/CssBaseline";
import ErrorPage from "./components/pages/Error";
import NormalAnnounce from "./components/atoms/button/NormalAnnounce";

const router = createBrowserRouter([
  {
    element: (
      <>
        <CssBaseline />
        <AECheckMenu />
        <Toolbar id="back-to-top-anchor" sx={{ height: { xs: 105, sm: 60 } }} />
        <NormalAnnounce />
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
        errorElement: <ErrorPage />,
      },
      {
        path: "/check",
        element: <CheckPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/analysis",
        element: <AnalysisPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/link",
        element: <LinkPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
