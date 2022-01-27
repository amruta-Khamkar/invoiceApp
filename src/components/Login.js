import React,{useRef,useState,useEffect} from 'react';
import {Container,Box,TextField,FormControlLabel,Checkbox,Button} from '@mui/material'
import { useNavigate } from 'react-router';
import { getUser,logUser } from '../config/Myservice';

const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Login() {
    const [user,setUser]=useState([]);
    const emailInp=useRef(null)
    const passInp=useRef(null)
    const [select,setSelect]=useState();
    const [errors,setErrors]=useState({email:'',password:''});
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
        // else if(value!== state.fname && value!== state.lname){
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
            case 'email':
                errors.email=regForEmail.test(value)?'':'Email is not valid';
                break;
            case 'password':
                errors.password=forPassword(value);
                console.log(errors.password)
                break;
            default :
                break;
        }
        setSelect({errors,[name]:value},()=>{
            console.log(errors)
        })
        console.log(select)
    }

    const userLogin=(event)=>{
        event.preventDefault();

        let email=emailInp.current.value;
        let password=passInp.current.value
            // console.log(email,password)
            if(validate(errors))
            {user.length !==0 && user.map(user=>
                {
                    if(user.email===email && user.password===password){
                        
                        let arr={email,password}
                        alert('Logged In Successfully!')
                        logUser(arr)
                        .then(res=>{
                            localStorage.setItem("_token",res.data.token)
                            if(res.data.err===1){
                                console.log(res.data) 
                                navigate('/login',{replace:true})
                            }
                            else if(res.data.err===0){
                                console.log(res.data)
                                localStorage.setItem('userlogin',JSON.stringify(arr));
                                navigate('/home',{replace:true})
                            }
                            
                        })
                        //  return navigate("/menu",{replace:true})
                            
                    }
                    // else{
                    // alert("User Not Found!Please Register yourself!!")
                    // return navigate("/register",{replace:true})
                    // // document.getElementById("email").value=null;
                    // // document.getElementById("password").value=null;
                    // }
                }
            )
           
            }
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
            <Container style={{backgroundColor:"Background"}} className="p-5 mt-3
            ">
            <Box style={{backgroundColor:"HighlightText",boxShadow:" 0 3px 10px rgb(0 0 0 / 0.2)",borderRadius:"10px"}} textAlign="center" height="400px" width="350px" margin="auto" marginTop="20px">
                <h1>Login</h1>
                 <Box bgcolor=""
       padding="3"
       component="form"
       noValidate
       autoComplete="off" onSubmit={userLogin}>

      <div><TextField margin="dense" type="text" name="email" id="email" label="Email" variant="outlined" required onChange={handler} onMouseOver={handler} inputRef={emailInp}/><br/>
      {errors.email.length>0 && <span style={{color:'red'}}>{errors.email}</span>}</div>

      <div><TextField margin="dense" type="password" name="password" id="password" label="Password" variant="outlined" required onChange={handler} onMouseOver={handler} inputRef={passInp}/><br/>
      {errors.password.length>0 && <span style={{color:'red'}}>{errors.password}</span>}</div>

      <div><FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" /></div>

      <div>
              <Button margin="dense" variant="contained" color="success" type="submit" onClick={userLogin}>Login</Button>
        </div>

    </Box>  
    </Box>
    </Container>
        </>
    )
}
