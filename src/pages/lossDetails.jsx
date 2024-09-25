import React, { useEffect, useState } from 'react';
import { AccordionComponent } from '../components/Accordian';
import { Button, Col, Form, Row } from 'react-bootstrap';
import ImageWithData from '../components/imageWithData';
import { CustomTable } from '../components/customTable/customTable';
import SelectInput from '../components/selectInput';
import { ButtonComponent } from '../components/ButtonComponent';
import TextInput from '../components/textInput';
import { TableWithPagination } from '../components/TableWithPagination/tableWithPagination';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { UseAuth } from '../components/customComponenets/useAuth';
import { SpinnerLoader } from '../components/spinner/spinner';


const LossDetails = () => {
    const [originalData, setOriginalData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copyOforiginalData, setCopyOfOriginalData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const [Isupdate, setIsUpdate] = useState(false);

    const [Remarks, setRemarks] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [activePage, setActivePage] = useState(1);

    const {SubmissionId} = useParams(); // can fetch param id from url

    const [{RoleName, Mobile, RoleId}] = UseAuth(); // can get auth details from redux state

    const navigate = useNavigate() // for switching page

    useEffect(() => {
        getDataFromApi();
    }, [rowsPerPage, activePage, Isupdate]);

    const getDataFromApi = async () => {
        setLoading(true);
        let { data } = await axiosInstance.post("getLossDatabyBySubId",
            {
                Type: null,
                SubmissionId: SubmissionId,
                PageNumber: activePage,
                RowsPerPage: rowsPerPage
            });
        setOriginalData(data.data?.TotalData);
        setTotalCount(data.data?.TotalCount);
        setCopyOfOriginalData(data.data?.TotalData);
        setLoading(false);
        setIsUpdate(false);
    }; // fetch data from api - LossDataBySubmissionId 


    const columns = [
        { accessor: "SubmissionId", label: "CaseNumber" },
        { accessor: "ApplicantName", label: "Applicant Name" },
        { accessor: "CreatedDate", label: "Applied Date" },
        { accessor: "Mobile", label: "Mobile" },
        { accessor: "LossType", label: "LossType" },
        { accessor: "CreatedMobile", label: "CreatedMobile" },
        { accessor: "History", label: "History" },
        { accessor: "Remarks", label: "Remarks" },
        { accessor: "Action", label: "Action" },
    ];

    const handleClickModify =(obj) => {
        navigate(`/lossPreview/${obj.id}/${obj.SubmissionId}`);
    };

    const handleRecord = async (status) => {
        let object = {
            SubmissionId: SubmissionId,
            Remarks: Remarks,
            VerifiedBy: RoleName+" - "+RoleId,
            VerifiedMobile: Mobile,
            SurveyStatus: status,
            History: RoleName+ " changed to "+ status
        };
        let { data } = await axiosInstance.post("updateStatusFromWeb",object);
        setIsUpdate(true);
        if(data.code == 200) return; 
    };
    return (
        <div className='m-4'>
            <SpinnerLoader isLoading={loading} />
            {/* <AccordionComponent title={"Claim Status"}>
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
            </AccordionComponent> */}
            <AccordionComponent className="mt-3" title={"Review History"}>
            <TableWithPagination
                    handleClickModify={handleClickModify}
                    rows={originalData}
                    title={"preview"}
                    columns={columns}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    totalCount={totalCount}
                />
            </AccordionComponent>
            <AccordionComponent className={"mt-3"} title={"Add Comments"}>
                <Row className='flex items-center gap-1'>
                    <Col md={12}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Comments</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => setRemarks(e.target.value)} value={Remarks} />
                        </Form.Group>
                    </Col>
                    {/* <Col md={3}>
                        <TextInput
                            name={"amount"}
                            placeholder={"Compensation Value"}
                            type={"number"}
                            onChange={undefined}
                            value={"10000"}
                        />
                    </Col> */}
                    {/* <Col md={3}>
                        <SelectInput
                            name={"role"}
                            defaultSelect={"Select Role"}
                            options={["Thasildhar", 'admin', 'Village Acccountant']}
                            type={"number"}
                            onChange={undefined}
                            value={"10000"}
                        />
                    </Col> */}
                    <Col md={2}>
                        <ButtonComponent disabled={!Remarks ? true : false} name={"Seek Clarification"} onClick={() =>handleRecord("Seek Clarification")} color={"#A4A813"} />
                    </Col>
                    <Col md={2}>
                        <ButtonComponent disabled={!Remarks ? true : false} name={"Approve"} onClick={() =>handleRecord("Approved")} color={"#25A813"} />
                    </Col>
                    <Col md={1}>
                        <ButtonComponent disabled={!Remarks ? true : false} name={"Rejected"} onClick={() =>handleRecord("Rejected")} color={"#F82C0B"} />
                    </Col>
                </Row>
            </AccordionComponent>
        </div>
    );
};

export default LossDetails;
