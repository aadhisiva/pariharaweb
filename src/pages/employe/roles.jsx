import React, { useEffect, useState } from 'react'
import { CustomTable } from '../../components/customTable/customTable'
import { Col, Row } from 'react-bootstrap';
import { ButtonComponent } from '../../components/ButtonComponent';
import RolesOffCanvas from '../../components/offcanvas/rolesOffCanvas';
import { postRequest } from '../../axios/axiosRequest';
import Breadcrumbs from '../../components/common/breadcrumbs';
import { SpinnerLoader } from '../../components/spinner/spinner';

export default function Roles() {
    const [originalData, setOriginalData] = useState([]);
    const [copyOforiginalData, setCopyOfOriginalData] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, SetModalTitle] = useState("");
    const [formData, setFormData] = useState("");
    const [loading, setLoading] = useState(false);

    const columns = [
        { accessor: "RoleName", label: "Role" },
        { accessor: "Action", label: "Action" },
    ];

    useEffect(() => {
        getIntitalRequest();
    }, []);

    const getIntitalRequest = async () => {
        setLoading(true);
        let saveData = await postRequest("addRolesOrGet", { ReqType: "Get" });
        setOriginalData(saveData);
        setCopyOfOriginalData(saveData);
        setShowModal(false);
        setLoading(false);
    }

    const hanldeClickAdd = () => {
        setFormData({});
        setShowModal(true);
        SetModalTitle("Add");
    };

    const hanldeClickModify = (obj) => {
        setFormData(obj);
        setShowModal(true);
        SetModalTitle("Modify");
    };

    const handleSubmitForm = async (values) => {
        setLoading(true);
        values['ReqType'] = "Add";
        await postRequest("addRolesOrGet", values);
        setShowModal(false);
        await getIntitalRequest();
        setLoading(false);
    }

    const openOffCanvas = () => {
        return (
            <RolesOffCanvas
                handleClose={() => setShowModal(false)}
                show={showModal}
                title={modalTitle}
                formData={formData}
                handleSubmitForm={handleSubmitForm} />
        );
    };

    return (
        <>
            <SpinnerLoader isLoading={loading} />
            <Breadcrumbs path={["Roles"]} />
            {showModal ? openOffCanvas() : ("")}
            <Row className='flex m-2'>
                <Col className='text-right'>
                    <ButtonComponent name={"Add Role"} onClick={hanldeClickAdd} />
                </Col>
            </Row>
            <CustomTable
                columns={columns}
                rows={originalData}
                handleClickModify={hanldeClickModify}
            />
        </>
    )
}
