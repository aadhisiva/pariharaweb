import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CardComponent from '../components/Card';
import { UseAuth } from '../components/customComponenets/useAuth';
import { SpinnerLoader } from '../components/spinner/spinner';
import axiosInstance from '../axiosInstance';


function Dashboard() {
  const [sats, setSats] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const [{ RoleName, Mobile, RoleAccess }] = UseAuth();

  let assignReqType = RoleAccess.District == "Yes" ? "District" :
    RoleAccess.Taluk == "Yes" ? "Taluk" :
      RoleAccess.Gp == "Yes" ? "Gp" : "";

  useEffect(() => {
    getIntitalRequest();
  }, []);

  const getIntitalRequest = async () => {
    try {
      setLoading(true);
      let { data } = await axiosInstance.post("getCountsByRole", { ReqType: assignReqType, Mobile, DataType: 'All' });
      setSats(data.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
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
      </Row>
    </div>
  );
}

export default Dashboard;