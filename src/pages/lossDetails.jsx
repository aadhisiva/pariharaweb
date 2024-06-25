import React, { useState } from 'react';
import { AccordionComponent } from '../components/Accordian';
import { Button, Col, Form, Row } from 'react-bootstrap';
import ImageWithData from '../components/imageWithData';
import { CustomTable } from '../components/customTable/customTable';
import SelectInput from '../components/selectInput';
import { ButtonComponent } from '../components/ButtonComponent';
import TextInput from '../components/textInput';

const newArray = [];
for (let i = 0; i < 5; i++) {
    let obj = {
        Date: `SubmissionId ${i}`,
        Entry: `ApplicantName ${i}`,
        DoorNumber: `LossType ${i}`,
        Mobile: `Mobile ${i}`,
        TypeOfHouse: `CreatedDate ${i}`,
        CauseOfDamage: `Hobli ${i}`,
        EstimatedDamageCount: `VillageName ${i}`,
        Image: `Status ${i}`
    }
    newArray.push(obj);
}

const LossDetails = () => {
    const [originalData, setOriginalData] = useState(newArray);
    const [copyOforiginalData, setCopyOfOriginalData] = useState(newArray);

    const columns = [
        { accessor: "Date", label: "Date" },
        { accessor: "Entry", label: "Entry By" },
        { accessor: "DoorNumber.", label: "Door No." },
        { accessor: "Mobile", label: "Mobile" },
        { accessor: "TypeOfHouse", label: "Type Of House" },
        { accessor: "CauseOfDamage", label: "Cause Of Damage" },
        { accessor: "EstimatedDamageCount", label: "Estimated Damage Count" },
        { accessor: "Image", label: "Images" },
        { accessor: "Action", label: "Action" },
    ];
    return (
        <div className='m-4'>
            <AccordionComponent title={"Claim Status"}>
                <Row className='gap-4 m-2 rounded-xl bg-white'>
                    <ImageWithData name={"Case Number"} value={"Nc00001"} icon={"bi-alphabet-uppercase"} />
                    <ImageWithData name={"Applicant Name"} value={"Sravan"} icon={"bi-window"} />
                    <ImageWithData name={"Loss Type"} value={"Crop Loss"} icon={"bi-card-list"} />
                    <ImageWithData name={"Clain Date"} value={"20-02-2023"} icon={"bi-calendar-date"} />
                    <ImageWithData name={"Contact"} value={"0000000000"} icon={"bi-person-lines-fill"} />
                    <ImageWithData name={"Door Number"} value={"7-89"} icon={"bi-house-door"} />
                    <ImageWithData name={"District"} value={"Ballari"} icon={"bi-geo-alt"} />
                    <ImageWithData name={"Taluk"} value={"Ballari"} icon={"bi-geo-alt-fill"} />
                    <ImageWithData name={"Hobli"} value={"Ballari"} icon={"bi-pin-map-fill"} />
                    <ImageWithData name={"Village"} value={"Ballari"} icon={"bi-pin-map-fill"} />
                    <ImageWithData name={"Street"} value={"Ballari"} icon={"bi-pin-map-fill"} />
                    <ImageWithData name={"Status"} value={"Pending"} icon={"bi-bar-chart-line"} />
                    <ImageWithData name={"View All"} value={"Images"} icon={"bi-image"} />
                    <ImageWithData name={"Preview"} value={""} icon={"bi-view-list"} />
                </Row>
            </AccordionComponent>
            <AccordionComponent className="mt-3" title={"Review History"}>
                <CustomTable columns={columns} rows={originalData} title={"view"} />
            </AccordionComponent>
            <AccordionComponent className={"mt-3"} title={"Add Comments"}>
                <Row className='flex items-center gap-1'>
                    <Col md={12}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Comments</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <TextInput
                            name={"amount"}
                            placeholder={"Compensation Value"}
                            type={"number"}
                            onChange={undefined}
                            value={"10000"}
                        />
                    </Col>
                    <Col md={3}>
                        <SelectInput
                            name={"role"}
                            defaultSelect={"Select Role"}
                            options={["Thasildhar", 'admin', 'Village Acccountant']}
                            type={"number"}
                            onChange={undefined}
                            value={"10000"}
                        />
                    </Col>
                    <Col md={2}>
                        <ButtonComponent name={"Seek Clarification"} onClick={undefined} color={"#A4A813"} />
                    </Col>
                    <Col md={2}>
                        <ButtonComponent name={"Approve"} onClick={undefined} color={"#25A813"} />
                    </Col>
                    <Col md={1}>
                        <ButtonComponent name={"Rejected"} onClick={undefined} color={"#F82C0B"} />
                    </Col>
                </Row>
            </AccordionComponent>
        </div>
    );
};

export default LossDetails;
