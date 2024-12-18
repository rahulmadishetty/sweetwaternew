'use client';

import React, { useState } from 'react';

import { Form, Button, Container, Col, Row, Alert } from 'react-bootstrap';

const EventsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    eventTitle: '',
    feedback: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.eventTitle) {
      setErrorMessage('Please select an event.');
      return false;
    }
    if (!formData.feedback.trim()) {
      setErrorMessage('Please provide your feedback.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) return;

    try {
      // Simulate successful submission
      console.log('Form submitted:', formData);
      setSubmitted(true);
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      eventTitle: '',
      feedback: '',
    });
    setSubmitted(false);
    setErrorMessage('');
  };

  return (
    <section className="py-15 bg-background min-h-screen flex justify-center items-center">
      <Container>
        <Row className="w-100">
          <Col md={8} lg={6} className="mx-auto">
            <h2 className="text-5xl font-bold text-center text-primary mb-8">We Would Love to Hear From You!</h2>

            {errorMessage && <Alert variant="danger" className="mb-4">{errorMessage}</Alert>}

            {!submitted ? (
              <Form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
                <Form.Group controlId="formEventTitle" className="mb-4">
                  <Form.Label className="font-bold text-lg">Event Attended</Form.Label>
                  <Form.Control
                    as="select"
                    name="eventTitle"
                    value={formData.eventTitle}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded p-3 w-full"
                  >
                    <option value="">Select an Event</option>
                    <option value="Sweetwater GuitarFest">Sweetwater GuitarFest</option>
                    <option value="Sweetwater Virtual GearFest">Sweetwater Virtual GearFest</option>
                    <option value="Sweetwater Education Series">Sweetwater Education Series</option>
                    <option value="Sweetwater Summer Jam">Sweetwater Summer Jam</option>
                    <option value="Sweetwater Studio Sessions">Sweetwater Studio Sessions</option>
                    <option value="Sweetwater Pro Audio Meetups">Sweetwater Pro Audio Meetups</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formFeedback" className="mb-4">
                  <Form.Label className="font-bold text-lg">Your Feedback</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    required
                    placeholder="We would love to hear your thoughts about the event..."
                    className="border border-gray-300 rounded p-3 w-full"
                  />
                </Form.Group>

                <div className="text-center">
                  <Button type="submit" variant="primary" className="px-4 py-1 text-lg text-white bg-primary hover:bg-primary-dark rounded-md">
                    Submit Feedback
                  </Button>
                </div>
              </Form>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h4 className="text-3xl font-semibold">Thank you for your feedback!</h4>
                <p className="text-muted text-xl">We appreciate you taking the time to share your experience.</p>
                <div className="mt-4">
                  <Button
                    variant="link"
                    className="text-primary text-xl"
                    onClick={handleReset}
                  >
                    Submit feedback for another event
                  </Button>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EventsPage;
