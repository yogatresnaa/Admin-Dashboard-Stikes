import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
export default function PreLoader() {
  return (
    <div className='d-flex w-100 justify-content-center align-items-center' style={{height:'100vh'}}>
       <Box sx={{ width: '50%' }}>
      <LinearProgress color='secondary'/>
    </Box>
    </div>
  )
}
