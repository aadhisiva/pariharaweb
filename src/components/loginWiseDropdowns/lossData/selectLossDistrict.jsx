import React, { FC, Fragment, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { UseAuth } from "../../customComponenets/useAuth";
import axiosInstance from "../../../axiosInstance";
import SelectInput from "../../selectInput";
// import ".././assignment.css";

export const SelectLossDistrict = ({
  originalData = [],
  listType,
  handleClickAdd,
  setCopyOriginalData,
}) => {
  const [selectedItems, setSelectItems] = useState({
    district: "",
    panchayat: "",
    taluk: "",
    village: "",
    type: "",
    lossType: "",
    surveyStatus: ""
  });

  const [districtDropDown, setDistrictDropDown] = useState([]);
  const [talukDropDown, setTalukDropDown] = useState([]);
  const [gpDropDown, setGpDropDown] = useState([]);
  const [villageDropDown, setVillageDropDown] = useState([]);
  const [loading, setLoading] = useState(false);


  const [{ Mobile, RoleAccess }] = UseAuth();

  const { district, panchayat, taluk, village, type, lossType, surveyStatus } = selectedItems;

  let assignReqType = RoleAccess.District == "Yes" ? "" :
    RoleAccess.Taluk == "Yes" ? "District" :
      RoleAccess.Gp == "Yes" ? "Taluk" : "";

  const checkAdmin = RoleAccess.District == "Yes";

  const handleTypeSelect = async (value) => {
    if (type !== value) {
      setSelectItems((prev) => ({
        ...prev,
        type: value,
        district: "",
        taluk: "",
        panchayat: "",
        village: "",
        lossType: "",
        surveyStatus: ""
      }));
      let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 1, loginType: checkAdmin ? "" : "District", ListType: assignReqType, Mobile, Type: value });
      setDistrictDropDown(data.data);
      setLoading(false);
    }
  };

  const handleDistrictSelect = async (value) => {
    if (district !== value) {
      setSelectItems((prev) => ({
        ...prev,
        district: value,
        taluk: "",
        panchayat: "",
        village: "",
        lossType: "",
        surveyStatus: ""
      }));
      let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 2, UDCode: value, loginType: checkAdmin ? "" : "Taluk", ListType: assignReqType, Mobile, Type: type });
      setTalukDropDown(data.data);
    }
  };

  const handleTalukSelect = async (value) => {
    if (taluk !== value) {
      setSelectItems((prev) => ({
        ...prev,
        taluk: value,
        panchayat: "",
        village: "",
        lossType: "",
        surveyStatus: ""
      }));
      let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 3, UTCode: value, UDCode: selectedItems.district, Type: type })
      setGpDropDown(data.data);
    };
  };

  const handleGpSelect = async (value) => {
    if (panchayat !== value) {
      setSelectItems((prev) => ({
        ...prev,
        panchayat: value,
        village: "",
        lossType: "",
        surveyStatus: ""
      }));
      let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 4, UGCode: value, UTCode: selectedItems.taluk, UDCode: selectedItems.district })
      setVillageDropDown(data.data);
    };
  };

  const handleVillageSelect = (value) => {
    if (village !== value) {
      setSelectItems((prev) => ({
        ...prev,
        village: value,
        lossType: "",
        surveyStatus: ""
      }));
    };
  };

  const handleLoss = (value) => {
    if (lossType !== value) {
      setSelectItems({
        ...selectedItems,
        lossType: value,
        surveyStatus: ""
      });
    };
  };

  const handleStatus = (value) => {
    if (lossType !== value) {
      setSelectItems({
        ...selectedItems,
        surveyStatus: value
      });
    };
  };

  const handleClearFilters = () => {
    setSelectItems((prev) => ({
      ...prev,
      district: "",
      panchayat: "",
      type: "",
      taluk: "",
      village: "",
      Type: "",
      lossType: "",
      surveyStatus: ""
    }));
  };

  const statusType = [
    { value: "Pending Ekyc", role: "Pending Ekyc" },
    { value: "Pending", role: "Pending" },
    { value: "Seek Clarification", role: "Seek Clarification" },
    { value: "Approved", role: "Approved" },
    { value: "Rejected", role: "Rejected" }];

  const lossTypes = [
    { value: "House Loss", role: "House Loss" }
  ];

  return (
    <React.Fragment>
      <Row className="boxTitle">
        <Col md={2} className="boxText">
          Filters
        </Col>
      </Row>
      <Row className="box">
        <Col md={3} sm={6}>
          <SelectInput
            defaultSelect="Select Type"
            options={[{ value: "Rural", role: "Rural" }, { value: "Urban", role: "Urban" }]}
            onChange={(e) => handleTypeSelect(e.target.value)}
            value={type}
            isValueAdded={true}
          />
        </Col>
        <Col md={3} sm={6}>
          <SelectInput
            defaultSelect="Select District"
            options={districtDropDown}
            onChange={(e) => handleDistrictSelect(e.target.value)}
            value={district}
            isValueAdded={true}
          />
        </Col>
        <Col md={3} sm={6}>
          <SelectInput
            defaultSelect="Select Taluk/Town"
            options={talukDropDown}
            onChange={(e) => handleTalukSelect(e.target.value)}
            value={taluk}
            isValueAdded={true}
          />
        </Col>
        <Col md={3} sm={6}>
          <SelectInput
            defaultSelect="Select Gp/Ward"
            options={gpDropDown}
            onChange={(e) => handleGpSelect(e.target.value)}
            value={panchayat}
            isValueAdded={true}
          />
        </Col>
        <Col md={3} sm={6}>
          <SelectInput
            defaultSelect="Select Village"
            options={villageDropDown}
            onChange={(e) => handleVillageSelect(e.target.value)}
            value={village}
            isValueAdded={true}
          />
        </Col>
        <Col md={3} sm={6}>
          <SelectInput
            defaultSelect="Select Loss"
            options={lossTypes}
            onChange={(e) => handleLoss(e.target.value)}
            value={lossType}
            isValueAdded={true}
          />
        </Col>
        <Col md={3} sm={6}>
          <SelectInput
            defaultSelect="Select Status"
            options={statusType}
            onChange={(e) => handleStatus(e.target.value)}
            value={surveyStatus}
            isValueAdded={true}
          />
        </Col>
        <Col md={3} sm={6}>
          <Button
            style={{ backgroundColor: "#13678C" }}
            onClick={() => handleClickAdd(selectedItems)}
          >
            Search Result
          </Button>
        </Col>
        <Col md={3} sm={6}>
          <Button
            style={{ backgroundColor: "#13678C" }}
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};
