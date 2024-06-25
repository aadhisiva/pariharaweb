import React from 'react'
import { Button } from 'react-bootstrap'

export const ButtonComponent = ({ type="button", name, disabled=false, onClick=undefined, color="", className="" }) => {
    return (
        <Button className={className} type={type} disabled={disabled} style={{ backgroundColor: color }} onClick={onClick}>
            {name}
        </Button>
    )
}
