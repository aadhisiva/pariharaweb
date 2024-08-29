import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { SpinnerLoader } from '../components/spinner/spinner';
import Breadcrumbs from '../components/common/breadcrumbs';
import { ButtonComponent } from '../components/ButtonComponent';
import { CustomTable } from '../components/customTable/customTable';
import RoleToLossOffCanvas from '../components/offcanvas/roleToLossOC';
import axiosInstance from '../axiosInstance';

export default function RoleMapToLoss() {
    const [originalData, setOriginalData] = useState([]);
    const [copyOforiginalData, setCopyOfOriginalData] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});

    const columns = [
        { accessor: "RoleName", label: "RoleName" },
        { accessor: "PendingEkyc", label: "PendingEkyc" },
        { accessor: "Pending", label: "Pending" },
        { accessor: "SeekClarification", label: "SeekClarification" },
        { accessor: "LossType", label: "LossType" },
        { accessor: "Action", label: "Action" },
    ];

    useEffect(() => {
        getIntitalRequest();
    }, []);

    const getIntitalRequest = async () => {
        setLoading(true);
        let { data } = await axiosInstance.post("assignLossAndGet", { ReqType: "Get" });
        setCopyOfOriginalData(data.data);
        setOriginalData(data.data);
        setLoading(false);
    }

    const handleSubmitForm = async (formData) => {
        setLoading(true);
        formData.ReqType = "Add";
        await axiosInstance.post("assignLossAndGet", formData);
        setShowModal(false);
        await getIntitalRequest();
        setLoading(false);
    }

    const openOffCanvas = () => {
        return (
            <RoleToLossOffCanvas
                handleClose={() => setShowModal(false)}
                show={showModal}
                title={modalTitle}
                formData={formData}
                handleSubmitForm={handleSubmitForm} />
        );
    };

    const hanldeClickAdd = (values) => {
        setShowModal(true);
        setModalTitle("Add");
    };

    const handleClickModify = (obj) => {
        setFormData({});
        setFormData(obj);
        setModalTitle("Modify");
        setShowModal(true);
    };

    return (
        <div>
            <SpinnerLoader isLoading={loading} />
            {showModal ? openOffCanvas() : ("")}
            <Breadcrumbs path={["Assign Role Access"]} />
            <Row className='flex m-2'>
                <Col className='text-right'>
                    <ButtonComponent name={"Add Access"} onClick={hanldeClickAdd} />
                </Col>
            </Row>
            <CustomTable
                columns={columns}
                rows={originalData}
                handleClickModify={handleClickModify}
            />
        </div>
    )
}
