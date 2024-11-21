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
import { SelectDistricts } from '../../components/loginWiseDropdowns/selectDistrict';
import DistrictOffCanvas from '../../components/offcanvas/districtOffCanvas';
import TalukOffCanvas from '../../components/offcanvas/talukOffCanvas';
import GpOffCanvas from '../../components/offcanvas/gpOffCanvas';
import { SelectGp } from '../../components/loginWiseDropdowns/selectGp';
import { UseAuth } from '../../components/customComponenets/useAuth';

export default function AssignGP() {
  const [originalData, setOriginalData] = useState([]);
  const [copyOforiginalData, setCopyOfOriginalData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const [{ Mobile, RoleName }] = UseAuth();
  const columns = [
    { accessor: "DistrictNameEn", label: "DistrictName" },
    { accessor: "TalukNameEn", label: "TalukName" },
    { accessor: "GpNameEn", label: "GpName" },
    { accessor: "Type", label: "Type" },
    { accessor: "Mobile", label: "Mobile" },
    { accessor: "Name", label: "Name" },
    { accessor: "RoleName", label: "Role" },
    { accessor: "PDOName", label: "PDOName" },
    { accessor: "PDOMobile", label: "PDOMobile" },
    { accessor: "AEOMobile", label: "AEOMobile" },
    { accessor: "AEOName", label: "AEOName" },
    { accessor: "Action", label: "Action" },
  ];

  useEffect(() => {
    getIntitalRequest();
  }, []);

  const getIntitalRequest = async () => {
    try {
      setLoading(true);
      let { data } = await axiosInstance.post("getAssignedMasters", { ReqType: 'Surveyer', Mobile });
      setCopyOfOriginalData(data.data);
      setOriginalData(data.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  const handleSubmitForm = async (formData) => {
    setLoading(true);
    let body = {
      ReqType: 3,
      DistrictCode: formData.DistrictId,
      TalukCode: formData.TalukId,
      GpCode: formData.GpId,
      ListType: "Gp",
      Name: formData.Name,
      Mobile: formData.Mobile,
      RoleId: formData.RoleId,
      Type: formData.Type,
      CreatedMobile: Mobile,
      CreatedRole: RoleName,
      id: formData.id,
      PDOMobile: formData.PDOMobile,
      AEOMobile: formData.AEOMobile,
      PDOName: formData.PDOName,
      AEOName: formData.AEOName,
      AEORoleId: formData.AEORoleId,
      PDORoleId: formData.PDORoleId,
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
    if (!values.district) return alert("Select District.");
    if (!values.taluk) return alert("Select Taluk.");
    if (!values.panchayat) return alert("Select Grama Panchayat.");
    setFormData({ DistrictCode: values.district, TalukCode: values.taluk, GpCode: values.panchayat, Type: values.type })
    setModalTitle("Add");
    setShowModal(true);
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
      <Breadcrumbs path={["Assign Gp"]} />
      <SelectGp
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
