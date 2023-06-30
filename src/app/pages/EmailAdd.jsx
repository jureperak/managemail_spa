import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import ConfirmationDialog from "../components/ConfirmationDialog";

function EmailAdd({ history }) {
  const [importanceTypes, setImportanceTypes] = useState([]);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCancelForm = (resetForm) => { resetForm(); setShow(false) };

  const schema = yup.object({
    fromEmailAddress: yup.string().email().required(),
    toEmailAddress: yup.string().email().required(),
    ccEmailAddress: yup.string(),
    subject: yup.string().required(),
    content: yup.string().required(),
    importanceTypeId: yup.string().required()
  });

  useEffect(async () => {
    await fetchImportanceTypes();
  }, []);

  async function fetchImportanceTypes() {
    try {
      const response = await axios.get('https://localhost:44398/api/importance-type');
      setImportanceTypes(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  async function postEmailHistory(values) {
    try {
      await axios({
        method: 'post',
        url: 'https://localhost:44398/api/email-history',
        data: values
      });

      history.push('/history');
    } catch (error) {
      setAlertMessage({title: "Error from server", content: "Something went wrong!"});
      setShowAlert(true)
    }
  }

  function onCancel() {
    handleShow()
  }

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={postEmailHistory}
        initialValues={{
          fromEmailAddress: "",
          toEmailAddress: "",
          ccEmailAddress: "",
          subject: "",
          content: "",
          importanceTypeId: ""
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          resetForm
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="fromEmailAddress">
                  <Form.Label>From email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="From email address"
                    value={values.fromEmailAddress}
                    onChange={handleChange}
                    isValid={touched.fromEmailAddress && !errors.fromEmailAddress}
                    isInvalid={!!errors.fromEmailAddress}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="toEmailAddress">
                  <Form.Label>To email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="To email address"
                    value={values.toEmailAddress}
                    onChange={handleChange}
                    isValid={touched.toEmailAddress && !errors.toEmailAddress}
                    isInvalid={!!errors.toEmailAddress}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="ccEmailAddress">
                  <Form.Label>CC email address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="CC email address"
                    value={values.ccEmailAddress}
                    onChange={handleChange}
                    isValid={touched.ccEmailAddress && !errors.ccEmailAddress}
                    isInvalid={!!errors.ccEmailAddress}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="subject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Subject"
                    value={values.subject}
                    onChange={handleChange}
                    isValid={touched.subject && !errors.subject}
                    isInvalid={!!errors.subject}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group className="mb-3" controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control as="textarea"
                    rows={10}
                    placeholder="Content"
                    value={values.content}
                    onChange={handleChange}
                    isValid={touched.content && !errors.content}
                    isInvalid={!!errors.content}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <div className="mb-3">
                  <Form.Label>Importance</Form.Label>
                  <br />
                  {importanceTypes.map((element, index) => (
                    <Form.Check
                      key={`inline-radio-${element.id}`}
                      className="form-label"
                      inline
                      value={element.id}
                      label={element.name}
                      name="importanceTypeId"
                      type="radio"
                      id={`inline-radio-${index}`}
                      onChange={handleChange}
                      isInvalid={!!errors.importanceTypeId}
                    />
                  ))}
                </div>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" type="button" style={{ marginLeft: '5px' }} onClick={onCancel}>
              Cancel
            </Button>
            <ConfirmationDialog
              show={show}
              title="Cancel Form"
              content="Are you sure you want to cancel adding new email?"
              primaryText="Yes"
              secondaryText="No"
              handlePrimary={() => handleCancelForm(resetForm)}
              handleSecondary={handleClose}
            />
          </Form>
        )}
      </Formik>
      {showAlert &&
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>{alertMessage.heading}</Alert.Heading>
          <p>
            {alertMessage.content}
          </p>
        </Alert>}
    </>
  );
}

export default EmailAdd;