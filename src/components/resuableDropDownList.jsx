import React, { FC, Fragment, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import SelectInput from "./selectInput";
import "./assignment.css";

export const ResuableDropDownList = ({
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
  });

  const [districtDropDown, setDistrictDropDown] = useState([]);
  const [talukDropDown, setTalukDropDown] = useState([]);
  const [gpDropDown, setGpDropDown] = useState([]);
  const [villageDropDown, setVillageDropDown] = useState([]);

  const { district, panchayat, type, taluk, village } = selectedItems;

  useEffect(() => {
    let filterData = originalData;
    // filter rural/urban
    if (type) {
      filterData = filterData.filter((obj) => obj.Type === type);
    }

    if (type && district) {
      filterData = filterData.filter(
        (obj) => obj.Type === type && obj.DistrictName === district
      );
    }

    // filter rural/urban and district
    if (type && district && taluk) {
      filterData = filterData.filter(
        (obj) =>
          obj.Type === type &&
          obj.DistrictName === district &&
          obj?.TalukName === taluk
      );
    }
    // filter rural/urban and district and taluka
    if (type && district && taluk && panchayat) {
      filterData = filterData.filter(
        (obj) =>
          obj.Type === type &&
          obj.DistrictName === district &&
          obj?.TalukName === taluk &&
          obj?.GramPanchayatName === panchayat
      );
    }
    // filter rural/urban and district and taluka
    if (type && district && taluk && panchayat && village) {
      filterData = filterData.filter(
        (obj) =>
          obj.Type === type &&
          obj.DistrictName === district &&
          obj?.TalukName === taluk &&
          obj?.GramPanchayatName === panchayat &&
          obj?.VillageName === village
      );
    }
    setCopyOriginalData(filterData);
  }, [type, district, taluk, panchayat, village]);

  const handleTypeSelect = (value) => {
    if (type !== value) {
      setSelectItems((prev) => ({
        ...prev,
        type: value,
        district: "",
        taluk: "",
        panchayat: "",
        village: "",
      }));
      let rural_urban = Array.from(
        new Set(
          originalData
            .filter((obj) => obj.Type === value)
            .map((obj) => obj.DistrictName)
        )
      );
      setDistrictDropDown(rural_urban);
    }
  };
  const handleDistrictSelect = (value) => {
    if (district !== value) {
      setSelectItems((prev) => ({
        ...prev,
        district: value,
        taluk: "",
        panchayat: "",
        village: "",
      }));
      let talukSelect = Array.from(
        new Set(
          originalData
            .filter((obj) => obj.Type === type && obj.DistrictName === value)
            .map((obj) => obj.TalukName)
        )
      );
      setTalukDropDown(talukSelect);
    }
  };

  const handleTalukSelect = (value) => {
    if (taluk !== value) {
      setSelectItems((prev) => ({
        ...prev,
        taluk: value,
        panchayat: "",
        village: "",
      }));
      let gpSelect = Array.from(
        new Set(
          originalData
            .filter(
              (obj) =>
                obj.Type === type &&
                obj.DistrictName === district &&
                obj.TalukName === value
            )
            .map((obj) => obj.GramPanchayatName)
        )
      );
      setGpDropDown(gpSelect);
    }
  };

  const handleGpSelect = (value) => {
    if (panchayat !== value) {
      setSelectItems((prev) => ({
        ...prev,
        panchayat: value,
        village: "",
      }));
      let villagesData = Array.from(
        new Set(
          originalData
            .filter(
              (obj) =>
                obj.Type === type &&
                obj.DistrictName === district &&
                obj.TalukName === taluk &&
                obj.GramPanchayatName === value
            )
            .map((obj) => obj.VillageName)
        )
      );
      setVillageDropDown(villagesData);
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
        <Fragment>
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect="Select Rural/Urban"
              options={Array.from(
                new Set(
                  originalData.map((obj) => obj.Type)
                )
              )}
              onChange={(e) => handleTypeSelect(e.target.value)}
              value={type}
            />
          </Col>
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect="Select District"
              options={districtDropDown}
              onChange={(e) => handleDistrictSelect(e.target.value)}
              value={district}
            />
          </Col>
        </Fragment>
        {listType !== 1 && (
          <Fragment>
            <Col md={3} sm={6}>
              <SelectInput
                defaultSelect="Select Taluk"
                options={talukDropDown}
                onChange={(e) => handleTalukSelect(e.target.value)}
                value={taluk}
              />
            </Col>
            {listType !== 2 && (
              <Fragment>
                <Col md={3} sm={6}>
                  <SelectInput
                    defaultSelect="Select Gp"
                    options={gpDropDown}
                    onChange={(e) => handleGpSelect(e.target.value)}
                    value={panchayat}
                  />
                </Col>
                {listType !== 3 && (
                  <Col md={3} sm={6}>
                    <SelectInput
                      defaultSelect="Select Village"
                      options={villageDropDown}
                      onChange={(e) => handleVillageSelect(e.target.value)}
                      value={village}
                    />
                  </Col>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
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
