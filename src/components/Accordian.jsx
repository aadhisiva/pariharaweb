import React from "react";
import { Accordion } from "react-bootstrap";

export const AccordionComponent = ({
    title = "Title",
    children,
    className
}) => {
    const accordionBodyStyle = {
        display: 'block',
        visibility: 'visible',
        color: 'black', // Ensure text color is black if needed
        borderRadius: 10
    };
    
    return (
        <Accordion style={{border: '2px solid #77E5E3', borderRadius: 10, boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.2)'}} defaultActiveKey="0" className={className}>
            <Accordion.Item style={{borderRadius: 10}} eventKey="0">
                <Accordion.Header>{title}</Accordion.Header>
                <Accordion.Body style={accordionBodyStyle}>
                    {children}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
