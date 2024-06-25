import React, { useEffect, useState } from 'react'
import { CustomTable } from '../../components/customTable/customTable'
import { Col, Row } from 'react-bootstrap';
import { ButtonComponent } from '../../components/ButtonComponent';
import RolesOffCanvas from '../../components/offcanvas/rolesOffCanvas';
import { postRequest } from '../../axios/axiosRequest';
import Breadcrumbs from '../../components/common/breadcrumbs';

const newArray = [];
for (let i = 0; i < 20; i++) {
    let obj = {
        Role: `Role ${i}`,
    }
    newArray.push(obj);
};

export default function Roles() {
    const [originalData, setOriginalData] = useState(newArray);
    const [copyOforiginalData, setCopyOfOriginalData] = useState(newArray);

    const [showModal, SetShowModal] = useState(false);
    const [modalTitle, SetModalTitle] = useState("");

    const columns = [
        { accessor: "Role", label: "Role" },
        { accessor: "Action", label: "Action" },
    ];

    useEffect(() => {
        getIntitalRequest();
    }, []);

    const getIntitalRequest =async  () =>{
        let saveData = await postRequest("save");
        if (saveData.code == 200) {
            SetShowModal(false);
        } else {
            SetShowModal(false);
        }
    }

    const hanldeClickAdd = () => {
        SetShowModal(true);
        SetModalTitle("Add");
    };

    const handleSubmitForm = async (formData) => {
        let saveData = await postRequest("save", formData);
        if (saveData.code == 200) {
            SetShowModal(false);
            await getIntitalRequest();
        } else {
            SetShowModal(false);
        }
    }

    const openOffCanvas = () => {
        return (
            <RolesOffCanvas
                handleClose={() => SetShowModal(false)}
                show={showModal}
                title={modalTitle}
                handleSubmitForm={handleSubmitForm} />
        );
    };

    return (
        <div>
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
            />
        </div>
    )
}
