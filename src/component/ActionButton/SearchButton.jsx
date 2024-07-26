import React from 'react'
import { Button } from 'reactstrap'

export default function SearchButton({ onClickHandler }) {
    return (
        <Button
            size="sm"
            className="align-self-end h-75"
            onClick={onClickHandler}
        >
            Cari
        </Button>
    )
}
