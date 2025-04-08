import { useState } from 'react'
import './App.css'
import axios from 'axios';

import toast, { Toaster } from 'react-hot-toast';
import FeedbackComponent from './Admin/admin';

import { Routes,Route,NavLink } from 'react-router-dom';

export default function App() {

  return (
    <>
    <Routes>
      <Route path="/admin" element={<FeedbackComponent/>} />
      <Route path="/" element={<FeedBack/>} />
    </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}/>  
        <div className="footer">
        © 2025   All rights reserved. 
        <p>
        Undela Murali

        </p>
        </div>
    </>
  )
}




import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

function FeedBack() {

  const [show, setShow] = useState(false);
  const [flag, setflag] = useState(false);
  const [feedbackdata,setfeedbackdata] = useState({name:"",email:"",message:"",date:""});


  const onSuccess = (msg) => toast.success(msg);
  const onError = (msg) => toast.error(msg);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  function onchange(e) {
    setfeedbackdata({
      ...feedbackdata,
      [e.target.name]: e.target.value
    });
  }

   
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


async function onsubmit(e)
  {
    e.preventDefault();
    const p = new Date();

    const {name,email,message}=feedbackdata;
    const data = {name,email,message,"date":p};

    if(name.trim()=="" || email.trim()=="" || message.trim()=="" )
    {
      onError("Please fill all the fields(*)");
      return;
    }else{
      
        if(!isValidEmail(email))
        {
          onError("Invalid Email id");
          return;
        }
   
    
    // Send data to the server
      setflag(true);
      const response = await axios.post('https://fallon-studio.onrender.com/Fallon/addFeedback',data)
      if(response.data.status)
      {
        onSuccess("Feedback sent successfully");
        onSuccess("Tahnks for your  valible feedback");

        handleClose();
        setflag(false);
        setfeedbackdata({name:"",email:"",message:"",date:""})
      }else{
        onError("Feedback not sent");
      }
      
    }
    
  }


  return (
    <>
    
      <Button variant="warning" onClick={handleShow} className='fs-3'>
        Give Your Feedback
      </Button>
      <br></br>
      <br></br>
    <NavLink className='btn btn-success' to="/admin" >View Submitted Feedback</NavLink>
  

      <Modal show={show} onHide={handleClose}
       backdrop="static">
        
        <Modal.Header closeButton>
          <Modal.Title>Give Your valible Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Full name<Start/></Form.Label>
              <Form.Control
                type="name"
                placeholder="e.g. John Doe"
                autoFocus 
                onChange={onchange}
                name='name'
                value={feedbackdata.name}
              />
              <Form.Label>Email address<Start/></Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                name='email'
                onChange={onchange}
                value={feedbackdata.email}

              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
             

            >
              <Form.Label>Message<Start/></Form.Label>
              <Form.Control as="textarea" rows={3} 
               onChange={onchange}
               name='message'
               value={feedbackdata.message}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
         {
          flag?  <Spinner animation="border" variant="success" />:
          <button className="btn btn-primary" disabled={flag} onClick={onsubmit}> 
            Submit
          </button>

         } 

        </Modal.Footer>
      </Modal>
    </>
  );
}




function Start() {
  return (
   <span className='text-danger fw-bold'>*</span>
  )
}
