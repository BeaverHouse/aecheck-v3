import { Outlet, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import CharacterCheckPage from "./components/pages/CharacterCheckPage";
import { CssBaseline } from "@mui/material";
import TopBar from "./components/organisms/TopBar";
import TopTabs from "./components/atoms/TopTabs";
import { analyzeTabData, checkTabData, searchTabData } from "./constant/fixedData";
import ScrollTop from "./components/atoms/ScrollToTop";
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Toolbar from '@mui/material/Toolbar';
import ManifestCheckPage from "./components/pages/ManifestCheckPage";
import GrastaCheckPage from "./components/pages/GrastaCheckPage";
import CharacterSearchPage from "./components/pages/CharacterSearchPage";
import BuddySearchPage from "./components/pages/BuddySearchPage";
import StardreamAnalyzePage from "./components/pages/StardreamAnalyzePage";
import WhitekeyAnalyzePage from "./components/pages/WhitekeyAnalyzePage";
import LegacyAnalyzePage from "./components/pages/LegacyAnalyzePage";

const router = createBrowserRouter([
    {
        element: (
            <>
                <CssBaseline />
                <TopBar />
                <Toolbar id="back-to-top-anchor" />
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
                element: (
                    <>
                        <TopTabs tabs={checkTabData} basePath="/check" />
                        <Outlet />
                    </>
                ),
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
                    }
                ]
            },
            {
                path: "/search",
                element: (
                    <>
                        <TopTabs tabs={searchTabData} basePath="/search" />
                        <Outlet />
                    </>
                ),
                children: [
                    {
                        path: "character",
                        element: <CharacterSearchPage />,
                    },
                    {
                        path: "buddy",
                        element: <BuddySearchPage />,
                    }
                ]
            },
            {
                path: "/analyze",
                element: (
                    <>
                        <TopTabs tabs={analyzeTabData} basePath="/analyze" />
                        <Outlet />
                    </>
                ),
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
                    }
                ]
            },
            {
                path: "/link",
                element: <p>준비중입니다.</p>,
            },
        ],
    },
]);

export default router;