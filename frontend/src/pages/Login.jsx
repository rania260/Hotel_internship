import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Alert } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';
import { useAuth } from '../context/AuthContext';  // Import the auth context

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);  // To handle errors
  const [success, setSuccess] = useState(false);  // To handle success
  const navigate = useNavigate();

  const { login } = useAuth();  // Use the login function from context

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.status === 200) {
        setSuccess(true);  // Set success state
        setError(null);     // Clear any previous errors
        alert('Login successful!');

        // Save JWT to local storage
        localStorage.setItem('access_token', data.access_token);

        // Call the login function from the context to store the user role
        login(data.role);

        // Check role and redirect accordingly
        if (data.role === 'admin') {
          // Redirect to admin dashboard
          navigate('/admin');
        } else {
          // Redirect to hotels page
          navigate('/hotels');
        }
      } else if (response.status === 401) {
        setError('Incorrect email or password');  // Set error message
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');  // Handle errors
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                {error && <Alert color="danger">{error}</Alert>}
                {success && <Alert color="success">Login successful! Redirecting...</Alert>}

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
                  </FormGroup>
                  <Button className='btn secondary__btn auth__btn' type='submit'>Login</Button>
                </Form>
                <p>Dont have an account? <Link to='/register'>Create</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
