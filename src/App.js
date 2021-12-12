import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function App() {
  const [formInput, setFormInput] = useState('');
  const navigate = useNavigate();

  return (
    <Container>
        <div class="main">
          <h1>
            Still Jobs!
          </h1>
          <img src="https://redlakejobs.ca/wp-content/uploads/2020/10/employment-300x136.jpg" />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label ></Form.Label>
              <Form.Control
                type="text"
                placeholder="type keyword in job title for search"
                value={formInput}
                onChange={(e) => setFormInput(e.target.value)}

              />
            </Form.Group>
          </Form>
          <Button
            variant="primary" onClick={() => navigate('/search/?term=' + formInput)}>
            Search for Jobs
          </Button>

        </div>
    </Container>
  );
}

export default App;
