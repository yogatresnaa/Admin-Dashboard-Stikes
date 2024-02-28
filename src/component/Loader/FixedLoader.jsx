import React from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
export default function FixedLoader() {
    return (
        <div
            className="d-flex w-100 justify-content-center align-items-center position-fixed top-0 "
            style={{ background: 'rgba(0,0,0,0.5)', zIndex: 1000 }}
        >
            <Box sx={{ width: '100%' }}>
                <LinearProgress color="secondary" sx={{ height: '5px' }} />
            </Box>
        </div>
    )
}
