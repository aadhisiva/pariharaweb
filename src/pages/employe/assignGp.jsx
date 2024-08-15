import React, { Fragment, useEffect, useState } from 'react'
import { CustomTable } from '../../components/customTable/customTable'
import { Col, Row, Spinner } from 'react-bootstrap';
import { postRequest } from '../../axios/axiosRequest';
import Breadcrumbs from '../../components/common/breadcrumbs';
import ManagementOffCanvas from '../../components/offcanvas/managementOffCanvas';
import { ButtonComponent } from '../../components/ButtonComponent';
import AssignmentOffCanvas from '../../components/offcanvas/assignmentOffCanvas';
import axiosInstance from '../../axiosInstance';
import { SpinnerLoader } from '../../components/spinner/spinner';
import { SelectMasters } from '../../components/selectMasters';
import DistrictOffCanvas from '../../components/offcanvas/districtOffCanvas';
import TalukOffCanvas from '../../components/offcanvas/talukOffCanvas';
import GpOffCanvas from '../../components/offcanvas/gpOffCanvas';

export default function AssignGP() {
  const [originalData, setOriginalData] = useState([]);
  const [copyOforiginalData, setCopyOfOriginalData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const columns = [
    { accessor: "DistrictNameEn", label: "DistrictName" },
    { accessor: "TalukNameEn", label: "TalukName" },
    { accessor: "GpNameEn", label: "GpName" },
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
    let { data } = await axiosInstance.post("getAssignedMasters", {ReqType: 3});
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
      GpCode: formData.GpId,
      ListType: "Gp",
      Name: formData.Name,
      Mobile: formData.Mobile,
      RoleId: formData.RoleId,
      id: formData.id
    };
    await axiosInstance.post("assigningProcess", body);
      setShowModal(false);
      await getIntitalRequest();
      setLoading(false);
  }

  const openOffCanvas = () => {
    return (
      <GpOffCanvas
        handleClose={() => setShowModal(false)}
        show={showModal}
        title={modalTitle}
        formData={formData}
        handleSubmitForm={handleSubmitForm} />
    );
  };

  const handleClickAdd = (values) => {
    if(!values.district) return alert("Select District.");
    if(!values.taluk) return alert("Select Taluk.");
    if(!values.panchayat) return alert("Select Grama Panchayat.");
   setFormData({DistrictCode: values.district, TalukCode: values.taluk, GpCode: values.panchayat})
   setShowModal(true);
   setModalTitle("Add");
  };

  const handleClickModify=(obj)=>{
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
      <SelectMasters
      handleClickAdd={handleClickAdd}
      listType={3} />
      <CustomTable
        columns={columns}
        rows={originalData}
        handleClickModify={handleClickModify}
      />
    </div>
  )
}