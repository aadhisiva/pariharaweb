import React, { useEffect, useState } from 'react'
import { CustomTable } from '../../components/customTable/customTable'
import Breadcrumbs from '../../components/common/breadcrumbs';
import axiosInstance from '../../axiosInstance';
import { SpinnerLoader } from '../../components/spinner/spinner';
import { Col, Row } from 'react-bootstrap';
import { ButtonComponent } from '../../components/ButtonComponent';
import RoleAccessOffCanvas from '../../components/offcanvas/roleAccessOffCanvas';

export default function RoleAccess() {
    const [originalData, setOriginalData] = useState([]);
    const [copyOforiginalData, setCopyOfOriginalData] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});

    const columns = [
        { accessor: "RoleName", label: "RoleName" },
        { accessor: "District", label: "District" },
        { accessor: "Taluk", label: "Taluk" },
        { accessor: "Gp", label: "Grama Panchayat" },
        { accessor: "Village", label: "Village" },
        { accessor: "Type", label: "Type" },
        { accessor: "Action", label: "Action" },
    ];

    useEffect(() => {
        getIntitalRequest();
    }, []);

    const getIntitalRequest = async () => {
        setLoading(true);
        try {
            let { data } = await axiosInstance.post("assignRoleAccess", { ReqType: "Get" });
            setCopyOfOriginalData(data.data);
            setOriginalData(data.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    }

    const handleSubmitForm = async (formData) => {
        setLoading(true);
        formData.ReqType = "Add";
        await axiosInstance.post("assignRoleAccess", formData);
        setShowModal(false);
        await getIntitalRequest();
        setLoading(false);
    }

    const openOffCanvas = () => {
        return (
            <RoleAccessOffCanvas
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
