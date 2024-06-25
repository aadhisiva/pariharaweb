import React from 'react';
import { Card } from 'react-bootstrap';

const CardComponent = ({ title, text }) => {
    return (
        <Card className="border rounded-sm w-52" style={{height: 120}}>
            <Card.Header className='text-center' style={{backgroundColor: "#b08340"}}>{title}</Card.Header>
            <Card.Body className='text-center bg-[#319d59]'>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CardComponent;
