import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThemeButton from '../atoms/ThemeButton';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../molecules/Sidebar';


function TopBar() {

    const navigate = useNavigate();

    return (
        <AppBar sx={{ flexGrow: 1 }} enableColorOnDark>
            <Toolbar>
                <Sidebar />
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/")}
                >
                    AE Check
                </Typography>
                <ThemeButton />
            </Toolbar>
        </AppBar>
    );
}

export default TopBar