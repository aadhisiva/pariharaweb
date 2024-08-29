import React, { FC, Fragment, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import SelectInput from "../selectInput";
import "../assignment.css";
import axiosInstance from "../../axiosInstance";
import { UseAuth } from "../customComponenets/useAuth";

export const SelectDistricts = ({
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
    type: ""
  });

  const [districtDropDown, setDistrictDropDown] = useState([]);
  const [talukDropDown, setTalukDropDown] = useState([]);
  const [gpDropDown, setGpDropDown] = useState([]);
  const [villageDropDown, setVillageDropDown] = useState([]);
  const [loading, setLoading] = useState(false);


  const [{ Mobile, RoleAccess }] = UseAuth();

  useEffect(() => {
    getIntitalFetch();
  }, []);

  const getIntitalFetch = async () => {
    setLoading(true);
    let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 1 });
    setDistrictDropDown(data.data);
    setLoading(false);
  };

  const { district, panchayat, taluk, village, type } = selectedItems;

  const handleTypeSelect = async (value) => {
    if (type !== value) {
      setSelectItems((prev) => ({
        ...prev,
        type: value,
        district: "",
        taluk: "",
        panchayat: "",
        village: ""
      }));
    }
  };
  const handleDistrictSelect = async (value) => {
    if (district !== value) {
      setSelectItems((prev) => ({
        ...prev,
        district: value,
        taluk: "",
        panchayat: "",
        village: ""
      }));
      let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 2, UDCode: value})
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
      }));
      let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 3, UTCode: value, UDCode: selectedItems.district })
      setGpDropDown(data.data);
    }
  };

  const handleGpSelect = async (value) => {
    if (panchayat !== value) {
      setSelectItems((prev) => ({
        ...prev,
        panchayat: value,
        village: "",
      }));
      let { data } = await axiosInstance.post("getMasterDropdown", { ReqType: 4, UGCode: value, UTCode: selectedItems.taluk, UDCode: selectedItems.district })
      setVillageDropDown(data.data);
    }
  };

  const handleVillageSelect = (value) => {
    if (village !== value) {
      setSelectItems((prev) => ({
        ...prev,
        village: value,
      }));
    }
  }

  const handleClearFilters = () => {
    setSelectItems((prev) => ({
      ...prev,
      district: "",
      panchayat: "",
      type: "",
      taluk: "",
      village: "",
    }));
  };

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
            options={[{value: "Rural", role: "Rural"}, {value: "Urban", role: "Urban"}]}
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
        {/* <Col md={3} sm={6}>
          <SelectInput
            defaultSelect="Select Taluk"
            options={talukDropDown}
            onChange={(e) => handleTalukSelect(e.target.value)}
            value={taluk}
            isValueAdded={true}
          />
        </Col>
        <Col md={3} sm={6}>
          <SelectInput
            defaultSelect="Select Gp"
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
        </Col> */}

        <Col md={3} sm={6}>
          <Button
            style={{ backgroundColor: "#13678C" }}
            onClick={() => handleClickAdd(selectedItems)}
          >
            Add User
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
