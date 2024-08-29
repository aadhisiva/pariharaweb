import React, { useEffect, useState } from 'react'
import { CustomTable } from '../../components/customTable/customTable'
import { Button, Col, Row } from 'react-bootstrap';
import Breadcrumbs from '../../components/common/breadcrumbs';
import AssignmentOffCanvas from '../../components/offcanvas/assignmentOffCanvas';
import axiosInstance from '../../axiosInstance';
import { SpinnerLoader } from '../../components/spinner/spinner';


export default function Taluk() {
  const [originalData, setOriginalData] = useState([]);
  const [copyOforiginalData, setCopyOfOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);

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
    { accessor: "DistrictCode", label: "DistrictCode" },
    { accessor: "TalukCode", label: "TalukCode" },
    { accessor: "TalukNameEn", label: "TalukNameEn" },
    { accessor: "TalukNameKa", label: "TalukNameKa" },
    { accessor: "Type", label: "Type" },
  ];


  const { AssignType, District, Hobli, Taluk, Village } = selectedItems; // destructured all values from selectedItems

  useEffect(() => {
    getIntitalRequest();
  }, []);

  const getIntitalRequest = async () => {
    setLoading(true);
    let { data } = await axiosInstance.post("getMasters", { ReqType: 2 });
    setShowModal(false);
    setCopyOfOriginalData(data.data);
    setOriginalData(data.data);
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



  const handleFileUpload = async (event) => {
    setLoading(true);
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      console.error('No file selected');
      return;
    };
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const { data } = await axiosInstance.post("/uploadTalukMasters", formData);
      if (data.code == 200) {
        await getIntitalRequest();
        alert('Data uploaded successfully');
      } else {
        return alert(data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <SpinnerLoader isLoading={loading} />
      <Breadcrumbs path={["Taluk"]} />
        {showModal ? openOffCanvas() : ("")}
      <Row className='flex flex-row'>
        <Col md={12} className='flex justify-end'>
          <Button
            variant="outlined"
          >
            Uplod XLSX {" "}
            <input type="file" accept=".xlsx" onChange={handleFileUpload} />
          </Button>
        </Col>
      </Row>
      {/* <Row className='flex m-2'>
        <Col className='text-right'>
          <ButtonComponent name={"Add Role"} onClick={handleClickAdd} />
        </Col>
      </Row> */}
      <CustomTable
        columns={columns}
        rows={originalData}
      />
    </div>
  )
}
