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

export default function AssignDistrict() {
  const [originalData, setOriginalData] = useState([]);
  const [copyOforiginalData, setCopyOfOriginalData] = useState([]);

  const [selectedItems, setSelectedItems] = useState({
    AssignType: '',
    District: '',
    Taluk: '',
    Hobli: '',
    Village: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const columns = [
    { accessor: "DistrictNameEn", label: "DistrictName" },
    { accessor: "Mobile", label: "Mobile" },
    { accessor: "Name", label: "Name" },
    { accessor: "RoleName", label: "Role" },
    { accessor: "Action", label: "Action" },
  ]; 


  const { AssignType, District, Hobli, Taluk, Village } = selectedItems; // destructured all values from selectedItems

  useEffect(() => {
    getIntitalRequest();
  }, []);

  const getIntitalRequest = async () => {
    setLoading(true);
    let { data } = await axiosInstance.post("getAssignedMasters", {ReqType: 1});
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
      ListType: "District",
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
      <DistrictOffCanvas
        handleClose={() => setShowModal(false)}
        show={showModal}
        title={modalTitle}
        formData={formData}
        handleSubmitForm={handleSubmitForm} />
    );
  };

  const handleClickAdd = (values) => {
    if(!values.district) return alert("Select District.");
   setFormData({DistrictCode: values.district})
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
      <Breadcrumbs path={["Assign District"]} />
      <SelectMasters
      handleClickAdd={handleClickAdd}
      listType={1} />
      <CustomTable
        columns={columns}
        rows={originalData}
        handleClickModify={handleClickModify}
      />
    </div>
  )
}