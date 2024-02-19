import { Button, Spinner } from 'reactstrap'
import React from 'react'

export default function ButtonWithLoader({
    size,
    color,
    text,
    onClick,
    disabled = false,
    isLoading,
    style = {},
}) {
    return (
        <Button
            size={size}
            color={color}
            onClick={onClick}
            disabled={disabled || isLoading}
            style={style}
        >
            {isLoading ? (
                <>
                    <Spinner size="sm"></Spinner>
                    <span> Loading</span>
                </>
            ) : (
                text
            )}
        </Button>
    )
}
