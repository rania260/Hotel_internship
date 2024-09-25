import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button, Alert } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'

const Register = () => {
   const [credentials, setCredentials] = useState({
      username: '',
      email: '',
      password: ''
   })
   
   const [error, setError] = useState(null)  // State for handling errors
   const [success, setSuccess] = useState(false)  // State for handling success

   const navigate = useNavigate();  // For redirecting

   const handleChange = e => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

   const handleClick = async (e) => {
      e.preventDefault()
      try {
         const response = await fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
         })

         const data = await response.json()

         if (response.status === 201) {
            setSuccess(true)  // Set success message
            setError(null)    // Clear any previous errors
            alert('User registered successfully!')
            navigate('/login') // Redirect to login after success
         } else if (response.status === 409) {
            setError(data.msg)  // Set error message
         }
      } catch (err) {
         setError('Something went wrong. Please try again later.')
      }
   }

   return (
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={registerImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Register</h2>

                        {error && <Alert color="danger">{error}</Alert>}
                        {success && <Alert color="success">User registered successfully! Redirecting...</Alert>}

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input type="text" placeholder='Username' id='username' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
                           </FormGroup>
                           <Button className='btn secondary__btn auth__btn' type='submit'>Create Account</Button>
                        </Form>
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default Register;
