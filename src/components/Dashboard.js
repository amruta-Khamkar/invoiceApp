import React,{useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router';
import { deleteInvoice, Updatepost, fetchproduct } from '../config/Myservice';
import { Button, Container, Grid ,Table,TableBody,TableHead,TableCell,TableRow} from '@mui/material';
import jwtToken from 'jwt-decode';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate()
    const [refresh, setrefresh] = useState(true)
    const[flag,setFlag]=useState();

    const [state, setstate] = useState({
        paymentReceived: 0,
        pendingAmount: 0,
        totalAmount: 0,
        paidInvoice: 0,
        unpaidInvoice: 0,
        totalInvoice: 0,
        invoices: []

    })

    const deleteEle = (item) => {
        deleteInvoice(item)
        setrefresh(!refresh)
    }
    const updateInvoice = (item) => {
        Updatepost(item)
        setrefresh(!refresh)
    }
    const logout=(e)=>{
        e.preventDefault();
        setFlag(true)
        localStorage.clear();
        navigate("/login")
 
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        // eslint-disable-next-line eqeqeq
        if (localStorage.getItem('userlogin') != undefined) {
            let user = localStorage.getItem('userlogin');
            // let decode = jwt_decode(token);
            
            // console.log(decode)
            // setUid(decode)
            
            let data = []
            await fetchproduct({ email:user.email }).then(res => {
                data = [...res.data]
                console.log(res.data)
            })
            // setstate({...state,invoices:data})
            let sumOfTotal = 0;
            let upaid = 0;
            let pamount = 0;
            let totalinvoice = 0;

            data.forEach(ele => {
                console.log(ele)

                totalinvoice += 1
                if (ele.status === 'UNPAID') {
                    upaid += 1
                    console.log('inside status');
                    ele.product.map(item => {
                        sumOfTotal += item.total
                        pamount += item.total


                    })
                }
                else {
                    ele.product.map(item => {
                        sumOfTotal += item.total
                    })

                }

                console.log(sumOfTotal, "Sum of total")


                if(localStorage.getItem('_token')!=undefined){
                    let token=localStorage.getItem('_token');
                    let decode=jwtToken(token);
                        console.log(decode)
                }
                // setstate({...state,totalAmount:ele.product.total})
            })

            setstate({
                invoices: data,
                paymentReceived: sumOfTotal - pamount,
                pendingAmount: pamount,
                totalAmount: sumOfTotal,
                paidInvoice: totalinvoice - upaid,
                unpaidInvoice: upaid,
                totalInvoice: totalinvoice,
            })
        }
    }, [refresh])
    return (
        <div>
            {

             localStorage.getItem('_token')!=undefined? 
             <>
            <div className='row'>
            <h1 className='col'>Dashboard</h1>
            <div className='col text-end'>
            <Button onClick={logout}>Logout</Button>
            </div>
            </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4}>
                <div class="card bg-primary text-white" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">Payment Received</h5>
                                <h6 class="card-subtitle mb-2 text-white mt-3">{state.paymentReceived}</h6>
                            </div>
                        </div>
                </Grid>
                <Grid item xs={4}>
                <div class="card bg-warning text-white" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">Pending Amount</h5>
                                <h6 class="card-subtitle mb-2 text-white mt-3">{state.pendingAmount}</h6>
                            </div>
                        </div>
                </Grid>
                <Grid item xs={4}>
                <div class="card" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">Total Amount</h5>
                                <h6 class="card-subtitle mb-2 text-muted mt-3">{state.totalAmount}</h6>
                            </div>
                        </div>
                </Grid>
                <Grid item xs={4}>
                    <div class="card" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">Total Invoice</h5>
                                <h6 class="card-subtitle mb-2 text-muted mt-3">{state.totalInvoice}</h6>
                            </div>
                        </div>
                </Grid>
                <Grid item xs={4}>
                    <div class="card bg-danger text-white" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">Unpaid Invoice</h5>
                                <h6 class="card-subtitle mb-2 text-white mt-3">{state.unpaidInvoice}</h6>
                            </div>
                        </div>
                </Grid>
                
                <Grid item xs={4}>
                <div class="card bg-success text-white" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">Paid Invoice</h5>
                                <h6 class="card-subtitle mb-2 text-white mt-3">{state.paidInvoice}</h6>
                            </div>
                        </div>
                </Grid>
            </Grid>
            </>: <Navigate to="/login"/>
}
            {/* <div  className="container mt-5">
                <Table>
                <TableHead>
                    <TableCell>Sr No</TableCell>
                    <TableCell>Reciever's Name</TableCell>
                    <TableCell>Reciever's Due Date</TableCell>
                    <TableCell>Reciever's email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell colSpan={3}>Action</TableCell>
                    
                   </TableHead>
                   <TableBody>
                       
                   
                   {state.invoices.map((ele, index) =>
                    
                        <TableRow>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{ele.rname}</TableCell>
                        <TableCell>{ele.rdate}</TableCell>
                        <TableCell>{ele.remail}</TableCell>
                        <TableCell>{ele.status}</TableCell>
                        <TableCell><Button className="btn btn-success" onClick={() => navigate('/preview', { state: {user:ele,amount:state.totalAmount}} )}>Preview</Button></TableCell>
                        <TableCell><Button className="btn btn-info" onClick={() => updateInvoice(ele)}>Update</Button></TableCell>
                        <TableCell><Button className="btn btn-danger" onClick={() => deleteEle(ele)}>Delete</Button></TableCell>
                 </TableRow>
                 
                  )}
                  
                   </TableBody> 
                </Table>
            </div> */}
        </div>
    )
}
