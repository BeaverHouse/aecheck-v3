import React from 'react'
import HomeGrid from '../atoms/HomeGrid'
import Box from '@mui/material/Box';

function HomePage() {
    return (
        <Box sx={{
            minHeight: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <HomeGrid />
        </Box>
    )
}

export default HomePage