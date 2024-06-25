import React, { Fragment, useEffect, useState } from 'react'
import { CustomTable } from '../../components/customTable/customTable'
import { Col, Row } from 'react-bootstrap';
import { ButtonComponent } from '../../components/ButtonComponent';
import RolesOffCanvas from '../../components/offcanvas/rolesOffCanvas';
import { postRequest } from '../../axios/axiosRequest';
import Breadcrumbs from '../../components/common/breadcrumbs';
import Checkbox from '../../components/formOptions/checkbox';
import SelectOption from '../../components/formOptions/selectOption';

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

export default function Management() {
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

  const [showAssignedData, setShowAssignedData] = useState(5);

  const [districtDropDown, setDistrictDropDown] = useState([]);
  const [talukDropDown, setTalukDropDown] = useState([]);
  const [hobliDropDown, setGpDropDown] = useState([]);
  const [villageDropDown, setVillageDropDown] = useState([]);

  const columns = [
    { accessor: "Role", label: "Role" },
    { accessor: "Mobile", label: "Mobile" },
    { accessor: "DistrictName", label: "District" },
    { accessor: "TalukName", label: "Taluk" },
    { accessor: "HobliName", label: "Hobli" },
    { accessor: "VillageName", label: "Village" },
    { accessor: "Action", label: "Action" },
  ];

  const { AssignType, District, Hobli, Taluk, Village } = selectedItems; // destructured all values from selectedItems

  useEffect(() => {
    getIntitalRequest();
  }, []);

  const getIntitalRequest = async () => {
    let saveData = await postRequest("save");
    if (saveData.code == 200) {
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  }

  const hanldeClickAdd = () => {
    setShowModal(true);
    setModalTitle("Add");
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
        handleClose={() => setShowModal(false)}
        show={showModal}
        title={modalTitle}
        handleSubmitForm={handleSubmitForm} />
    );
  };

  const handleAssignTypeSelect = (value) => {
    if (AssignType !== value) {
      setSelectedItems({
        ...selectedItems,
        AssignType: value,
        District: "",
        Taluk: "",
        Hobli: "",
        Village: "",
      });
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
      setSelectedItems({
        ...selectedItems,
        District: value,
        Taluk: "",
        Hobli: "",
        Village: "",
      });
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
      setSelectedItems({
        ...selectedItems,
        Taluk: values,
        Hobli: "",
        Village: "",
      });
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
    if (Hobli !== value) {
      setSelectedItems({
        ...selectedItems,
        Hobli: value,
        Village: "",
      });
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
    if (Village !== value) {
      setSelectedItems({
        ...selectedItems,
        village: value,
      });
    }
  }

  const handleClearFilters = () => {
    setSelectedItems({
      ...selectedItems,
      AssignType: "",
      District: "",
      Taluk: "",
      Hobli: "",
      Village: "",
    });
  };

  const handleClickAdd = (items) => {
    if (!items.AssignType) return alert("Select AssignType");
  }

  return (
    <div>
      <Breadcrumbs path={["Emp-Management"]} />
      {showModal ? openOffCanvas() : ("")}
      <Row className="flex ml-12 m-3 mb-0">
        <Col md={2} style={{ borderRadius: '10px 10px 0 0' }} className="border border-solid border-b-0 border-black bg-black text-white">
          Assignment
        </Col>
      </Row>
      <Row className="flex flex-row border border-solid border-gray-400 gap-y-4 rounded-b-lg m-3 mt-0 p-2">
        <Col md={3}>
          <SelectOption
            defaultOption={"Select Assigning Type"}
            name={"AssignType"}
            value={AssignType}
            onChange={(e) => handleAssignTypeSelect(e.target.value)}
            options={["District", "Taluk", "Hobli", "Village"]} />
        </Col>
        {AssignType !== "" && (
          <Fragment>
            <Col md={3} sm={6}>
              <SelectOption
                defaultOption="Select District"
                options={districtDropDown}
                onChange={(e) => handleDistrictSelect(e.target.value)}
                value={District}
              />
            </Col>
            {AssignType !== "District" && (
              <Fragment>
                <Col md={3} sm={6}>
                  <SelectOption
                    defaultOption="Select Taluk"
                    options={talukDropDown}
                    onChange={(e) => handleTalukSelect(e.target.value)}
                    value={Taluk}
                  />
                </Col>
                {AssignType !== "Taluk" && (
                  <Fragment>
                    <Col md={3} sm={6}>
                      <SelectOption
                        defaultOption="Select Hobli"
                        options={hobliDropDown}
                        onChange={(e) => handleGpSelect(e.target.value)}
                        value={Hobli}
                      />
                    </Col>
                    {AssignType !== "Hobli" && (
                      <Col md={3} sm={6}>
                        <SelectOption
                          defaultOption="Select Village"
                          options={villageDropDown}
                          onChange={(e) => handleVillageSelect(e.target.value)}
                          value={Village}
                        />
                      </Col>
                    )}
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        )}

        <Col md={3} sm={6}>
          <ButtonComponent color="#13678C" onClick={() => handleClickAdd(selectedItems)} name={"Add user"} />
        </Col>
        <Col md={3} sm={6}>
          <ButtonComponent color="#13678C" onClick={handleClearFilters} name={"Clear Filters"} />
        </Col>
      </Row>
      {/* <Row className='m-3'>
        <Col md={3} sm={6}>
          <ButtonComponent color={showAssignedData == 0 ? "green" : ""} onClick={() => SetShowAssignedData(0)} name={"District Data"} />
        </Col>
        <Col md={3} sm={6}>
          <ButtonComponent color={showAssignedData == 1 ? "green" : ""} onClick={() => SetShowAssignedData(1)} name={"Taluk Data"} />
        </Col>
        <Col md={3} sm={6}>
          <ButtonComponent color={showAssignedData == 2 ? "green" : ""} onClick={() => SetShowAssignedData(2)} name={"Hobli Data"} />
        </Col>
        <Col md={3} sm={6}>
          <ButtonComponent color={showAssignedData == 3 ? "green" : ""} onClick={() => SetShowAssignedData(3)} name={"Village Data"} />
        </Col>
      </Row> */}
      <CustomTable
        columns={columns}
        rows={originalData}
      />
    </div>
  )
}
