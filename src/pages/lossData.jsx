import React, { Fragment, useEffect, useState } from 'react'
import { CustomTable } from '../components/customTable/customTable'
import { ResuableDropDownList } from '../components/resuableDropDownList';
import Breadcrumbs from '../components/common/breadcrumbs';
import { SelectLossDistrict } from '../components/loginWiseDropdowns/lossData/selectLossDistrict';
import axiosInstance from '../axiosInstance';
import { SpinnerLoader } from '../components/spinner/spinner';
import { TableWithPagination } from '../components/TableWithPagination/tableWithPagination';
import { useNavigate } from 'react-router-dom';
import { LOSS_DETAILS } from '../utils/routePaths';

export default function LossData() {
    const [originalData, setOriginalData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copyOforiginalData, setCopyOfOriginalData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [activePage, setActivePage] = useState(1);

    const [searchObject, setSearchObject] = useState({});
    const [searching, setSearching] = useState(false);

    const navigate = useNavigate(); //for switch pages
    const columns = [
        { accessor: "SubmissionId", label: "CaseNumber" },
        { accessor: "ApplicantName", label: "Applicant Name" },
        { accessor: "LossType", label: "LossType" },
        { accessor: "Mobile", label: "Mobile" },
        { accessor: "ApplicantHouseType", label: "Applicant House Type" },
        { accessor: "DamageType", label: "DamageType" },
        { accessor: "CreatedDate", label: "Applied Date" },
        { accessor: "SurveyStatus", label: "Status" },
        { accessor: "Action", label: "Action" },
    ];
    useEffect(() => {
        if (searching) {
            getDataFromApi();
        }
    }, [rowsPerPage, activePage, searching, searchObject]);
    
    const getDataFromApi = async () => {
        const { district, panchayat, taluk, village, type, lossType, surveyStatus } = searchObject;

        setLoading(true);
        try {
            let { data } = await axiosInstance.post("getLossDatabySearch",
                {
                    District: district || null,
                    Taluk: taluk || null,
                    Gp: panchayat || null,
                    Village: village || null,
                    Type: type || null,
                    StartDate: null,
                    EndDate: null,
                    PageNumber: activePage,
                    RowsPerPage: rowsPerPage,
                    LossType: lossType || null,
                    SurveyStatus: surveyStatus || null
                });
            setOriginalData(data.data?.TotalData);
            setTotalCount(data.data?.TotalCount);
            setCopyOfOriginalData(data.data?.TotalData);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };

    const handleClickAdd = async (values) => {
        setSearchObject(values);
        setSearching(true);
    };

    const handleClickModify = (obj) => {
        if (!obj.SubmissionId) return;
        navigate(`/lossDeatils`, {
                state: {
                    SubmissionId: obj.SubmissionId,  // Passing current table rows as state
                    Status: obj.SurveyStatus,  // Example: If you are paginating
                  },
        });
    }; // checking submissionId and switching page for deatils

    return (
        <div>
            <SpinnerLoader isLoading={loading} />
            <Breadcrumbs path={["Loss Data"]} />
            <SelectLossDistrict
                handleClickAdd={handleClickAdd}
                listType={3} />
            <div className='border m-2'>
                <TableWithPagination
                    handleClickModify={handleClickModify}
                    rows={originalData}
                    title={"History"}
                    columns={columns}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    totalCount={totalCount}
                />
            </div>
        </div>
    )
};
