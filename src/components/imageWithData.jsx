import React from 'react'
import { Col } from 'react-bootstrap'

export default function ImageWithData({ name, value, icon }) {
    return (
        <Col md={2} className='flex flex-col border rounded-xl bg-[#f9f6f6]' aria-disabled={true}>
            <div className='flex flex-row items-center font-bold space-x-4'>
                <div><i className={`bi ${icon} text-4xl`}></i></div>
                <span>{name}</span>
            </div>
            <div>
                <span className='text-sm'>{value}</span>
            </div>
        </Col>
    )
}
