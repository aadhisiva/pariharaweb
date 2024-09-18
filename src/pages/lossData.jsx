import React, { Fragment, useState } from 'react'
import { CustomTable } from '../components/customTable/customTable'
import { ResuableDropDownList } from '../components/resuableDropDownList';
import Breadcrumbs from '../components/common/breadcrumbs';
import { SelectLossDistrict } from '../components/loginWiseDropdowns/lossData/selectLossDistrict';
import axiosInstance from '../axiosInstance';
import { SpinnerLoader } from '../components/spinner/spinner';

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
    const [originalData, setOriginalData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copyOforiginalData, setCopyOfOriginalData] = useState([]);

    const columns = [
        { accessor: "SubmissionId", label: "CaseNumber" },
        { accessor: "ApplicantName", label: "Applicant Name" },
        { accessor: "LossType", label: "LossType" },
        { accessor: "Mobile", label: "Mobile" },
        { accessor: "ApplicantHouseType", label: "Applicant House Type" },
        { accessor: "DamageType", label: "DamageType" },
        { accessor: "CreatedDate", label: "Claim Date" },
        { accessor: "SurveyStatus", label: "Status" },
        { accessor: "Action", label: "Action" },
    ];

    const handleClickAdd = async (values) => {
        const { district, panchayat, taluk, village, type } = values;
        setLoading(true);
        let { data } = await axiosInstance.post("getLossDatabySearch",
            {
                District: district,
                Taluk: taluk,
                Gp: panchayat,
                Village: village,
                Type: type,
                StartDate: "",
                EndDate: ""
            });
        setOriginalData(data.data);
        setCopyOfOriginalData(data.data);
        setLoading(false);
    };

    console.log("originalData",originalData)
    return (
        <div>
            <SpinnerLoader isLoading={loading} />
            <Breadcrumbs path={["Loss Data"]} />
            <SelectLossDistrict
                handleClickAdd={handleClickAdd}
                listType={3} />
            <div className='border m-2'>
                <CustomTable
                    rows={originalData}
                    title={"View"}
                    columns={columns}
                />
            </div>
        </div>
    )
};
