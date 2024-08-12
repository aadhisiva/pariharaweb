import React, { Fragment, useEffect, useState } from 'react'
import { CustomTable } from '../../components/customTable/customTable'
import { Col, Row } from 'react-bootstrap';
import { postRequest } from '../../axios/axiosRequest';
import Breadcrumbs from '../../components/common/breadcrumbs';
import ManagementOffCanvas from '../../components/offcanvas/managementOffCanvas';
import { ButtonComponent } from '../../components/ButtonComponent';
import AssignmentOffCanvas from '../../components/offcanvas/assignmentOffCanvas';

const newArray = [];
for (let i = 0; i < 100; i++) {
  let obj = {
    Role: `Role ${i}`,
    Mobile: `Mobile ${i}`,
    DistrictName: `DistrictName ${i}`,
    TalukName: `TalukName ${i}`,
    HobliName: `HobliName ${i}`,
    VillageName: `VillageName ${i}`
  }
  newArray.push(obj);
};

export default function Assignment() {
  const [originalData, setOriginalData] = useState(newArray);
  const [copyOforiginalData, setCopyOfOriginalData] = useState(newArray);

  const [selectedItems, setSelectedItems] = useState({
    AssignType: '',
    District: '',
    Taluk: '',
    Hobli: '',
    Village: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");


  const columns = [
    { accessor: "Role", label: "Role" },
    { accessor: "Mobile", label: "Mobile" },
    { accessor: "Name", label: "Name" },
    { accessor: "Action", label: "Action" },
  ];


  const { AssignType, District, Hobli, Taluk, Village } = selectedItems; // destructured all values from selectedItems

  useEffect(() => {
    getIntitalRequest();
  }, []);

  const getIntitalRequest = async () => {
  
    let saveData = await postRequest("assigningProcess", {ReqType: "Get"});
      setShowModal(false);

  }

  const handleSubmitForm = async (formData) => {
    // let saveData = await postRequest("save", formData);
    if (200 == 200) {
      setShowModal(false);
      setSearchParams(`showData=${AssignType}`, { replace: true });
      // await getIntitalRequest();
    } else {
      setShowModal(false);
    }
  }

  const openOffCanvas = () => {
    return (
      <AssignmentOffCanvas
        handleClose={() => setShowModal(false)}
        show={showModal}
        title={modalTitle}
        formData={originalData}
        handleSubmitForm={handleSubmitForm} />
    );
  };

  const handleClickAdd = (items) => {
    setModalTitle("Add");
    setShowModal(true);
  };

  return (
    <div>
      <Breadcrumbs path={["Emp-Assignment"]} />
      <Row className='flex m-2'>
        <Col className='text-right'>
          <ButtonComponent name={"Add Role"} onClick={handleClickAdd} />
        </Col>
      </Row>
      {showModal ? openOffCanvas() : ("")}
      <CustomTable
        columns={columns}
        rows={originalData}
      />
    </div>
  )
}
