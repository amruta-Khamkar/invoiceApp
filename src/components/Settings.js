import { Button,TextField,Container,Box,FormControlLabel,Checkbox } from '@mui/material';
import React,{useState,useEffect,useRef} from 'react';
import { getUser } from '../config/Myservice';
import {useNavigate} from 'react-router';
import {Navigate} from 'react-router-dom'
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName=RegExp(/^[A-Za-z]{2,50}$/);
const regForAdd=RegExp(/^[A-Za-z0-9]{2,150}$/);

export default function Settings() {
    let emailInp=useRef(null)
    let mobInp=useRef(null)
    let bnameInp=useRef(null)
    let addInp=useRef(null)
    const [user,setUser]=useState([]);
    const [flag,setFlag]=useState(0);
    const [errors,setErrors]=useState({email:'',mobile:'',bname:'',address:''});
    const [select,setSelect]=useState();
    const navigate=useNavigate();
    useEffect(()=>{
        getUser()
        .then(res=>{
            if(res.data.err === 1){
                alert(res.data.msg)
            }
            else if( res.data.err === 0){
                // console.log(res.data.regUser)
                setUser(res.data.regUser)
                // console.log(userData)
            }
        })
    },[user])

    const handler=(event)=>{
        const {name,value}=event.target;
        switch(name){
            case 'email':
                errors.email=regForEmail.test(value)?'':'Email is not valid';
                break;
            case 'mobile':
                errors.mobile= value.length === 10?'':'Mobile no must consist of 10 digits';
                break;
            case 'bname':
                errors.bname= regForName.test(value)?'':'Enter proper Bussiness name';
                break;
            case 'address':
                errors.address= regForAdd.test(value)?'':'Enter Proper Address';
                break;
            default :
                break;
        }
        setSelect({errors,[name]:value},()=>{
            console.log(errors)
        })
        console.log(select)
    }

    const editPro=()=>{
        setFlag(1)
    }
    const editData=()=>{
        
    }
    return (

        <div>
            {
                localStorage.getItem('_token')!=undefined? 
                <>
                <h1>Settings</h1>
    
                {user.map(u=>
                   <div class="card " style={{ width: "18rem" }}>
                   <div class="card-body">
                       <h5 class="card-title">Profile Details</h5>
                       <h6 class="card-subtitle mb-2  mt-3">{u.fname} {u.lname}</h6>
                       <h6 class="card-subtitle mb-2  mt-3">{u.email}</h6>
                       <h6 class="card-subtitle mb-2  mt-3">{u.mobile}</h6>
                       <h6 class="card-subtitle mb-2  mt-3">{u.address}</h6>
                       <Button onClick={editPro}>Edit Profile</Button>
                   </div>
               </div>)}
                
                {flag===1 && 
                <Container style={{backgroundColor:"Background"}} className="p-5">
                <Box style={{backgroundColor:"HighlightText",boxShadow:" 0 3px 10px rgb(0 0 0 / 0.2)",borderRadius:"10px"}} textAlign="center" height="500px" width="700px" margin="auto" marginTop="20px" className='text-center'>
                    <h1>Profile</h1>
                     <Box bgcolor=""
           padding="3"
           component="form"
           noValidate
           autoComplete="off" >
    
          <div><TextField margin="dense" type="text" name="email" id="email" label="Email" variant="outlined" required onChange={handler} onMouseOver={handler} inputRef={emailInp}/><br/>
          {errors.email.length>0 && <span style={{color:'red'}}>{errors.email}</span>}</div>
    
          <div><TextField margin="dense" type="number" name="mobile" id="mobile" label="Mobile No" variant="outlined" required onChange={handler} onMouseOver={handler} inputRef={mobInp}/><br/>
          {errors.mobile.length>0 && <span style={{color:'red'}}>{errors.mobile}</span>}</div>
    
          <div><TextField margin="dense" type="text" name="bname" id="bname" label="Bussiness Name" variant="outlined" required onChange={handler} onMouseOver={handler} inputRef={bnameInp}/><br/>
          {errors.bname.length>0 && <span style={{color:'red'}}>{errors.bname}</span>}</div>
    
          <div><TextField margin="dense" type="text" name="address" id="address" label="Contact Address" variant="outlined" required onChange={handler} onMouseOver={handler} inputRef={addInp}/><br/>
          {errors.address.length>0 && <span style={{color:'red'}}>{errors.address}</span>}</div>
    
          <div><FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" /></div>
    
          <div>
                  <Button margin="dense" variant="contained" color="success" onclick={editData} type="submit">Update</Button>
            </div>
    
        </Box>  
        </Box>
        </Container> }
        </> :<Navigate to="/login"/>
            }
           
        </div>
    )
}
