import React,{useState,useRef,useEffect} from 'react';
import {Container,Box,TextField,FormControlLabel,Button,Checkbox} from '@mui/material';
import {useNavigate} from 'react-router';
import { getUser, regUser } from '../config/Myservice';

const regForName=RegExp(/^[A-Za-z]{2,50}$/);
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForAddress=RegExp(/^[A-Za-z0-9]{5,150}$/)

export default function Register() {
    const [userData,setUserData]=useState([]);
    const fnameInp=useRef(null);
    const lnameInp=useRef(null);
    const emailInp=useRef(null);
    const unameInp=useRef(null);
    const passInp=useRef(null);
    const cpassInp=useRef(null);
    const [select,setSelect]=useState();
    const [errors,setErrors]=useState({ fname:'',lname:'',uname:'', email:'',password:'',con_password:''});
    const navigate=useNavigate();

    useEffect(()=>{
        getUser()
        .then(res=>{
            if(res.data.err === 1){
                alert(res.data.msg)
            }
            else if( res.data.err === 0){
                // console.log(res.data.regUser)
                setUserData(res.data.regUser)
                // console.log(userData)
            }
        })
    },[userData])

    const forPassword=(value)=>{
        const upper=RegExp(/^(?=.*[A-Z]).*$/);
        const lower=RegExp(/^(?=.*[a-z]).*$/);
        const special=RegExp(/^(?=.*[@$!%*?&]).*$/);
        const num=RegExp(/^(?=.*[0-9]).*$/);
        if(!upper.test(value)){
            return 'Password must contain atleast 1 Uppercase character';}
        else if(!lower.test(value)){
            return 'Password must contain atleast 1 Lowercase character';}
        else if(!special.test(value)){
            return 'Password must contain atleast 1 Special character';}
        // else if(value!== this.state.fname && value!== this.state.lname){
            // return 'Password cannot contain users first name or last name';}
            else if(!num.test(value)){
                return 'Password must contain atleast 1 Number';}
            else if(value.length<8){
                return 'Password must contain minimum 8 characters';}
        else{ return '';}
    };

    const handler=(event)=>{
        const {name,value}=event.target;
        
        switch(name){
            case 'fname':
                errors.fname=regForName.test(value)?'':'Enter Valid name!';
                break;
            case 'lname':
                errors.lname=regForName.test(value)?'':'Enter Valid name!';
                break;
            case 'uname':
                errors.uname=regForName.test(value)?'':'Enter Valid  Username!';
                break;
            case 'email':
                errors.email=regForEmail.test(value)?'':'Email is not valid';
                
                break;
            case 'password':
                errors.password=forPassword(value);
                // let chkpass=value
                console.log(errors.password)
                
                break;
            case 'con_password':
                console.log(passInp.current.value)
                errors.con_password=passInp.current.value===(value)?'':'Password does not match';
                 console.log(errors.con_password)
                break;
            default :
                break;
        }
        setSelect({errors,[name]:value},()=>{
            console.log(errors)
        })
    }

    const userReg=()=>{
        // event.preventDefault();
        let fname=fnameInp.current.value;
        let lname=lnameInp.current.value;
        let uname=unameInp.current.value;
        let email=emailInp.current.value;
        let password=passInp.current.value;
        let con_password=cpassInp.current.value;
            console.log(email,password)
            if(validate(errors))
            { 
                if(userData.length !== 0){
                let arr=userData
                console.log(arr)
                userData.map(user=>
                {if( user.email===email && user.password===password)
                    {
                        alert(" User already Registered!!")
                        return navigate('/login',{replace:true});
                    }


                else{
                    let data={image:'',fname:fnameInp.current.value,email:emailInp.current.value,lname:lnameInp.current.value,uname:unameInp.current.value,password:passInp.current.value,con_password:cpassInp.current.value}
                    regUser(data)
                    .then(res=>{
                        console.log("Data Posted!!")
                        // navigate('/login',{replace:true})
                    })
                    alert('Registered In Successfully!')
                    return navigate("/login",{replace:true})
             
                }
                })
                


                    }  
            else{
            // let arr={con_password,password,email,uname,lname,fname}
            
              regUser({con_password,password,email,uname,lname,fname})
              .then(res=>{
                  console.log("Data Posted!!")
                  // navigate('/login',{replace:true})
              })
              alert('Registered In Successfully!')
              return navigate("/login",{replace:true})
             
                }
        }
        /* else{
        alert("User Not Found!")
        document.getElementById("email").value=null;
        document.getElementById("password").value=null;
        } */
           
            
            else{
               alert("Enter Correct Email and Password!!")
                
            
            }
           
        
    }
    const validate=(errors)=>{
        let valid=true;
        Object.values(errors).forEach((val)=> val.length >0 && (valid=false));
        return valid;
    }

    return (
        <>
            {/* <h1>Register</h1> */}
            <Container style={{backgroundColor:"Background"}} className="p-3 mt-3">
                <Box style={{backgroundColor:"HighlightText",boxShadow:" 0 3px 10px rgb(0 0 0 / 0.2)",borderRadius:"10px"}} className="" textAlign="center" height="auto" width="350px" padding="10px" margin="auto" marginTop="20px">
                <h1>Register</h1>
                 <Box     padding="3"
       component="form"
       noValidate
       autoComplete="off" onSubmit={userReg} >

      <div><TextField margin="dense" type="text" name="fname" id="fname" label="First Name" variant="outlined" required onChange={handler} onMouseOver={handler} inputRef={fnameInp}/><br/>
      {errors.fname.length>0 && <span style={{color:'red'}}>{errors.fname}</span>}</div>

      <div><TextField margin="dense" type="text" name="lname" id="lname" label="Last Name" variant="outlined" required onChange={handler} onMouseOver={handler} inputRef={lnameInp}/><br/>
      {errors.lname.length>0 && <span style={{color:'red'}}>{errors.lname}</span>}</div>

      <div><TextField margin="dense" type="text" name="uname" id="uname" label="Username" variant="outlined" required onChange={handler} onMouseOver={handler} inputRef={unameInp}/><br/>
      {errors.uname.length>0 && <span style={{color:'red'}}>{errors.uname}</span>}</div>

      <div><TextField margin="dense" type="text" name="email" id="email" label="Email" variant="outlined" required onChange={handler} onMouseOver={handler} inputRef={emailInp}/><br/>
      {errors.email.length>0 && <span style={{color:'red'}}>{errors.email}</span>}</div>

      <div><TextField margin="dense" type="password" name="password" id="password" label="Password" variant="outlined" required onChange={handler} onMouseOver={handler} inputRef={passInp}/><br/>
      {errors.password.length>0 && <span style={{color:'red'}}>{errors.password}</span>}</div>

      <div><TextField margin="dense" type="password" name="con_password" id="con_password" label="Confirm Password" variant="outlined" required onChange={handler} inputRef={cpassInp} /><br/>
      {errors.con_password.length>0 && <span style={{color:'red'}}>{errors.con_password}</span>}</div>

      {/* <div><FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" /></div> */}

      <div>
              <Button variant="contained" color="success" type="submit" onClick={userReg}>Register</Button>
        </div>

    </Box>  
    </Box>
    </Container>
        </>
    )
}
