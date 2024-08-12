import React, { Fragment, useState } from 'react'
import { CustomTable } from '../components/customTable/customTable'
import { ResuableDropDownList } from '../components/resuableDropDownList';
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

    const handleClickAdd = () => {

    }
    return (
        <div>
            <Breadcrumbs path={["Loss Data"]} />
            <ResuableDropDownList
                handleClickAdd={handleClickAdd}
                listType={0}
                setCopyOriginalData={setCopyOfOriginalData}
                originalData={originalData} />
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
