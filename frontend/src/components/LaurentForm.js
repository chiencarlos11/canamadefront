import React from 'react';
import { Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SoloDatePicker from './DatePicker.js';
import Fabric from './Fabric.js'

export default class LaurentForm extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label >Date</Label>
          <SoloDatePicker />
        </FormGroup>
        <FormGroup>
          <Label>PO Number</Label>
          <Input type="text" name="po_number" id="po_number" placeholder="" />
        </FormGroup>
        <FormGroup>
          <Label>Original Width</Label>
          <Input type="number" name="original_width" id="original_width" placeholder="" />
        </FormGroup>
        <FormGroup>
          <Label>Original Height</Label>
          <Input type="number" name="original_height" id="original_height" placeholder="" />
        </FormGroup>
        <FormGroup>
          <Label>Control</Label>
          <Input type="select" name="control" id="control">
            <option>24</option>
            <option>36</option>
            <option>48</option>
            <option>60</option>
            <option>72</option>
            <option>84</option>
            <option>96</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <legend>Cassette</legend>
          <Container>
            <Row>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="cassette_orientation" />{' '}
                    Left
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="cassette_orientation" />{' '}
                    Right
                  </Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup check>
                <Label check>
                  <Input type="radio" name="cassette_extra" />{' '}
                  Court
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="cassette_extra" />{' '}
                  Trim
                </Label>
              </FormGroup>
              </Col>
              <Col>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="cassette_color" />{' '}
                  White
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="cassette_color" />{' '}
                  Silver
                </Label>
              </FormGroup>
              </Col>
            </Row>
          </Container>
          </FormGroup>
          <Fabric />

      </Form>
    );
  }
}