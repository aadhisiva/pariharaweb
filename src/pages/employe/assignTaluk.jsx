import React, { useEffect, useState } from 'react'
import { CustomTable } from '../../components/customTable/customTable'
import Breadcrumbs from '../../components/common/breadcrumbs';
import axiosInstance from '../../axiosInstance';
import { SpinnerLoader } from '../../components/spinner/spinner';
import TalukOffCanvas from '../../components/offcanvas/talukOffCanvas';
import { SelectTaluk } from '../../components/loginWiseDropdowns/selectTaluk';
import { Col, Row } from 'react-bootstrap';
import { ButtonComponent } from '../../components/ButtonComponent';
import { UseAuth } from '../../components/customComponenets/useAuth';

export default function AssignTaluk() {
  const [originalData, setOriginalData] = useState([]);
  const [copyOforiginalData, setCopyOfOriginalData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const [{ RoleName, Mobile }] = UseAuth();

  const columns = [
    { accessor: "DistrictNameEn", label: "DistrictName" },
    { accessor: "TalukNameEn", label: "TalukName" },
    { accessor: "Type", label: "Type" },
    { accessor: "Mobile", label: "Mobile" },
    { accessor: "Name", label: "Name" },
    { accessor: "RoleName", label: "Role" },
    { accessor: "Action", label: "Action" },
  ];

  useEffect(() => {
    getIntitalRequest();
  }, []);

  const getIntitalRequest = async () => {
    setLoading(true);
    let { data } = await axiosInstance.post("getAssignedMasters", { ReqType: 2 });
    setCopyOfOriginalData(data.data);
    setOriginalData(data.data);
    setLoading(false);
  }

  const handleSubmitForm = async (formData) => {
    setLoading(true);
    let body = {
      ReqType: 1,
      DistrictCode: formData.DistrictId,
      TalukCode: formData.TalukId,
      ListType: "Taluk",
      Name: formData.Name,
      Mobile: formData.Mobile,
      RoleId: formData.RoleId,
      Type: formData.Type,
      CreatedMobile: Mobile,
      CreatedRole: RoleName,
      id: formData.id
    };
    await axiosInstance.post("assigningProcess", body);
    setShowModal(false);
    await getIntitalRequest();
    setLoading(false);
  }

  const openOffCanvas = () => {
    return (
      <TalukOffCanvas
        handleClose={() => setShowModal(false)}
        show={showModal}
        title={modalTitle}
        formData={formData}
        handleSubmitForm={handleSubmitForm} />
    );
  };

  const handleClickAdd = (values) => {
    // if (!values.district) return alert("Select District.");
    // if (!values.taluk) return alert("Select Taluk.");
    setFormData({ DistrictCode: values.district, TalukCode: values.taluk, Type: values.type })
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
      <Breadcrumbs path={["Assign Taluk"]} />
      {/* <SelectTaluk
        handleClickAdd={handleClickAdd}
        listType={2} /> */}
      <Row className='flex m-2'>
        <Col className='text-right'>
          <ButtonComponent name={"Assign To Taluk"} onClick={handleClickAdd} />
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
