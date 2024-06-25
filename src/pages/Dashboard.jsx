import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import CardComponent from '../components/Card';
import { dashBoardSats } from '../utils/constData';


function Dashboard() {
  const [sats, setSats] = useState(dashBoardSats);

  return (
    <div className='m-3'>
      <Row>
        <Col className='text-right text-blue-600' md={12}>Welcome, Tahsildar</Col>
      </Row>
      <Row className="gap-y-5">
        {(sats || []).map((obj, i) => (
          <Col key={i} md={3}>
            <CardComponent title={obj?.name} text={obj?.count ?? 0} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Dashboard;