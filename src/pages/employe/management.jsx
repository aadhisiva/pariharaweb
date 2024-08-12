import React, { Fragment, useEffect, useState } from 'react'
import { CustomTable } from '../../components/customTable/customTable'
import { Col, Row } from 'react-bootstrap';
import { ButtonComponent } from '../../components/ButtonComponent';
import { postRequest } from '../../axios/axiosRequest';
import Breadcrumbs from '../../components/common/breadcrumbs';
import SelectOption from '../../components/formOptions/selectOption';
import ManagementOffCanvas from '../../components/offcanvas/managementOffCanvas';
import { useSearchParams } from 'react-router-dom';
import { SpinnerLoader } from '../../components/spinner/spinner';

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

  const [searchParams, setSearchParams] = useSearchParams();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [showAssignedData, setShowAssignedData] = useState(5);

  const [districtDropDown, setDistrictDropDown] = useState([]);
  const [talukDropDown, setTalukDropDown] = useState([]);
  const [hobliDropDown, setGpDropDown] = useState([]);
  const [villageDropDown, setVillageDropDown] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { accessor: "Role", label: "Role" },
    { accessor: "Mobile", label: "Mobile" },
    { accessor: "DistrictName", label: "District" },
    { accessor: "TalukName", label: "Taluk" },
    { accessor: "HobliName", label: "Hobli" },
    { accessor: "VillageName", label: "Village" },
    { accessor: "Action", label: "Action" },
  ];

  const columnsTaluk = [
    { accessor: "Role", label: "Role" },
    { accessor: "Mobile", label: "Mobile" },
    { accessor: "DistrictName", label: "District" },
    { accessor: "TalukName", label: "Taluk" }, ,
    { accessor: "Action", label: "Action" },
  ];

  const columnsDistrict = [
    { accessor: "Role", label: "Role" },
    { accessor: "Mobile", label: "Mobile" },
    { accessor: "DistrictName", label: "District" },
    { accessor: "Action", label: "Action" },
  ];

  const columnsHobli = [
    { accessor: "Role", label: "Role" },
    { accessor: "Mobile", label: "Mobile" },
    { accessor: "DistrictName", label: "District" },
    { accessor: "TalukName", label: "Taluk" },
    { accessor: "HobliName", label: "Hobli" },
    { accessor: "Action", label: "Action" },
  ];

  const { AssignType, District, Hobli, Taluk, Village } = selectedItems; // destructured all values from selectedItems

  useEffect(() => {
    getIntitalRequest();
  }, []);

  const getIntitalRequest = async () => {
    setLoading(true);
    // let saveData = await postRequest("assigningProcess", { ReqType: "Get" });
    let masters = await postRequest("retriveMasters", {DistrictCode: ""});
    setDistrictDropDown(masters);
    // setOriginalData(saveData);
    // setCopyOfOriginalData(saveData);
    setShowModal(false);
    setLoading(false);
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
      <ManagementOffCanvas
        handleClose={() => setShowModal(false)}
        show={showModal}
        title={modalTitle}
        formData={selectedItems}
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
    }
  };

  const handleDistrictSelect = async (value) => {
    setLoading(true);
    if (District !== value) {
      setSelectedItems({
        ...selectedItems,
        District: value,
        Taluk: "",
        Hobli: "",
        Village: "",
      });
      let masters = await postRequest("retriveMasters", {DistrictCode: value});
      setTalukDropDown(masters[0].TalukArray.map(obj => { return {value: obj.TalukCode, name: obj.TalukName}}));
      setLoading(false);
    }
    setLoading(false);
  };

  const handleTalukSelect = async (value) => {
    if (taluk !== value) {
      setSelectedItems({
        ...selectedItems,
        Taluk: values,
        Hobli: "",
        Village: "",
      });
      let masters = await postRequest("retriveMasters", {DistrictCode: District});
      setTalukDropDown(masters[0].TalukArray[value]);
      setGpDropDown((masters[0].TalukArray[value]));
      setLoading(false);
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
    setModalTitle("Add");
    setShowModal(true);
  };
  console.log("districtDropDown",districtDropDown)

  const persistDataFromUrl = searchParams.get('showData');
  const isShowDistrict = persistDataFromUrl == "District";
  const isShowTaluk = persistDataFromUrl == "Taluk";
  const isShowHobli = persistDataFromUrl == "Hobli";
  return (
    <div>
      <SpinnerLoader isLoading={loading} />
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
                options={districtDropDown.map(obj => { return {value: obj.DistrictCode, name: obj.DistrictName}})}
                onChange={(e) => handleDistrictSelect(e.target.value)}
                value={District}
                isCodeAvialable={true}
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
        <CustomTable
          columns={isShowDistrict ? columnsDistrict : isShowTaluk ? columnsTaluk : isShowHobli ? columnsHobli : columns}
          rows={originalData}
          />
          {/* {persistDataFromUrl ? (
      ) : (
        <>
          <span className='flex justify-center'>No Record...</span>
          <span className='flex justify-center'>Assign Some values...</span>
        </>
      )} */}
    </div>
  )
}
