import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThemeButton from '../atoms/ThemeButton';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../molecules/Sidebar';


function TopBar() {

    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
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
        </Box>
    );
}

export default TopBar