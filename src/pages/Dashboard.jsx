import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import CardComponent from '../components/Card';
import { dashBoardSats } from '../utils/constData';
import { UseAuth } from '../components/customComponenets/useAuth';
import { SpinnerLoader } from '../components/spinner/spinner';
import axiosInstance from '../axiosInstance';


function Dashboard() {
  const [sats, setSats] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const [{ RoleName, Mobile }] = UseAuth();

  useEffect(() => {
    getIntitalRequest();
  }, []);

  const getIntitalRequest = async () => {
    setLoading(true);
    let { data } = await axiosInstance.post("getCountsByRole", { ReqType: 'District', Mobile, DataType: 'All' });
    setSats(data.data);
    setLoading(false);
  };

  return (
    <div className='m-3'>
      <SpinnerLoader isLoading={loading} />
      <Row>
        <Col className='text-right text-blue-600' md={12}>Welcome, {RoleName}</Col>
      </Row>
      <Row className="gap-y-5">
        {
          (Object.entries(sats[0]).map(([key, value]) => (
            <Col key={key} md={3}>
              <CardComponent title={key ?? ""} text={value ?? 0} />
            </Col>
          )))
        }
        <h4 className='text-center'>No data available.....</h4>
      </Row>
    </div>
  );
}

export default Dashboard;