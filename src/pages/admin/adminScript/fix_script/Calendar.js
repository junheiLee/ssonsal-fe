import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (dateString) => {
    // Parse the input date string in the user's timezone
    const userTimezoneDate = new Date(dateString);

    // Get the user's timezone offset in minutes
    const timezoneOffset = userTimezoneDate.getTimezoneOffset();

    // Convert the user's timezone offset to milliseconds
    const timezoneOffsetMs = timezoneOffset * 60 * 1000;

    // Adjust the date by adding the timezone offset
    const seoulTimezoneDate = new Date(userTimezoneDate.getTime() + timezoneOffsetMs);

    setSelectedDate(seoulTimezoneDate);
  };

  return (
    <Container className="mt-5">
  <Col md="6">
    <div style={{ marginBottom: '30px' }}>
      <h2>달력</h2>
    </div>
    <Form.Group controlId="formDate">
      <Form.Control
        type="date"
        value={selectedDate.toISOString().split('T')[0]}
        onChange={(e) => {
          handleDateChange(e.target.value);
          // 여기서 한국 시간으로 설정
          const seoulTimezoneDate = new Date(selectedDate.getTime() + (9 * 60 * 60 * 1000));
          setSelectedDate(seoulTimezoneDate);
        }}
      />
    </Form.Group>
  </Col>
</Container>
  );
};

export default Calendar;