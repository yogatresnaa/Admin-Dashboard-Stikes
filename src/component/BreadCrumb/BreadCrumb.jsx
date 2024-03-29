import { Breadcrumbs } from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
export default function BreadCrumb({ items }) {
    const navigate = useNavigate()
    return (
        <Breadcrumbs
            separator=">"
            aria-label="breadcrumb"
            className="d-flex"
            style={{ listStyle: 'none', fontSize: '0.7rem' }}
        >
            {items.map((item) => (
                <Link
                    underline="hover"
                    key="1"
                    color="inherit"
                    style={{ fontSize: '0.7rem', cursor: 'pointer' }}
                    onClick={() => navigate(item.linkTo)}
                >
                    {item.name}
                </Link>
            ))}
        </Breadcrumbs>
    )
}
