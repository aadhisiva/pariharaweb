import React, { useState } from 'react'
import { CustomTable } from '../components/customTable/customTable'
import { ResuableDropDownList } from '../components/resuableDropDownList';
import { Row } from 'react-bootstrap';
import Breadcrumbs from '../components/common/breadcrumbs';

const newArray = [];
for (let i = 0; i < 100; i++) {
    let obj = {
        SubmissionId: `SubmissionId ${i}`,
        ApplicantName: `ApplicantName ${i}`,
        LossType: `LossType ${i}`,
        Mobile: `Mobile ${i}`,
        CreatedDate: `CreatedDate ${i}`,
        Hobli: `Hobli ${i}`,
        VillageName: `VillageName ${i}`,
        Status: `Status ${i}`
    }
    newArray.push(obj);
}

export default function LossData() {
    const [originalData, setOriginalData] = useState(newArray);
    const [copyOforiginalData, setCopyOfOriginalData] = useState(newArray);

    const columns = [
        { accessor: "SubmissionId", label: "CaseNumber" },
        { accessor: "ApplicantName", label: "Applicant Name" },
        { accessor: "LossType", label: "LossType" },
        { accessor: "Mobile", label: "Mobile" },
        { accessor: "CreatedDate", label: "Claim Date" },
        { accessor: "Hobli", label: "Hobli" },
        { accessor: "VillageName", label: "Village" },
        { accessor: "Status", label: "Status" },
        { accessor: "Action", label: "Action" },
    ];
    return (
        <div>
            <Breadcrumbs path={["Loss Data"]} />
            <Row className="boxTitle">
                <Col md={2} className="boxText">
                    Filters
                </Col>
            </Row>
            <Row className="box">
                <Fragment>
                    <Col md={3} sm={6}>
                        <SelectInput
                            defaultSelect="Select Rural/Urban"
                            options={Array.from(
                                new Set(
                                    originalData.map((obj) => obj.Type)
                                )
                            )}
                            onChange={(e) => handleTypeSelect(e.target.value)}
                            value={type}
                        />
                    </Col>
                    <Col md={3} sm={6}>
                        <SelectInput
                            defaultSelect="Select District"
                            options={districtDropDown}
                            onChange={(e) => handleDistrictSelect(e.target.value)}
                            value={district}
                        />
                    </Col>
                </Fragment>
                {listType !== 1 && (
                    <Fragment>
                        <Col md={3} sm={6}>
                            <SelectInput
                                defaultSelect="Select Taluk"
                                options={talukDropDown}
                                onChange={(e) => handleTalukSelect(e.target.value)}
                                value={taluk}
                            />
                        </Col>
                        {listType !== 2 && (
                            <Fragment>
                                <Col md={3} sm={6}>
                                    <SelectInput
                                        defaultSelect="Select Gp"
                                        options={gpDropDown}
                                        onChange={(e) => handleGpSelect(e.target.value)}
                                        value={panchayat}
                                    />
                                </Col>
                                {listType !== 3 && (
                                    <Col md={3} sm={6}>
                                        <SelectInput
                                            defaultSelect="Select Village"
                                            options={villageDropDown}
                                            onChange={(e) => handleVillageSelect(e.target.value)}
                                            value={village}
                                        />
                                    </Col>
                                )}
                            </Fragment>
                        )}
                    </Fragment>
                )}
                <Col md={3} sm={6}>
                    <Button
                        style={{ backgroundColor: "#13678C" }}
                        onClick={() => handleClickAdd(selectedItems)}
                    >
                        Add User
                    </Button>
                </Col>
                <Col md={3} sm={6}>
                    <Button
                        style={{ backgroundColor: "#13678C" }}
                        onClick={handleClearFilters}
                    >
                        Clear Filters
                    </Button>
                </Col>
            </Row>
            <div className='border m-2'>
                <CustomTable
                    rows={originalData}
                    title={"View"}
                    columns={columns}
                //   handleCLickModify={}
                />
            </div>
        </div>
    )
};
