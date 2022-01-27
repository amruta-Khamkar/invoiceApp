import React,{useState,useEffect} from 'react';
import { deleteInvoice, Updatepost, fetchproduct } from '../config/Myservice';
import { Button, Container, Grid ,Table,TableBody,TableHead,TableCell,TableRow} from '@mui/material';
import { useNavigate } from 'react-router';
import {Navigate} from 'react-router-dom'

export default function Invoices() {
    const navigate = useNavigate()
    const [refresh, setrefresh] = useState(true)
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        // eslint-disable-next-line eqeqeq
        // if (localStorage.getItem('_token') != undefined) {
        //     let token = localStorage.getItem('_token');
        //     let decode = jwt_decode(token);
        //     console.log(decode)
            // setUid(decode)
            
            let data = []
            await fetchproduct({ email: "nidhi@gmail.com" }).then(res => {
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
        // }
    }, [refresh])
    return (
        <div>
            {
                localStorage.getItem("_token")!=undefined?
                <>
                <h1>Invoices</h1>
            <div  className="container mt-5">
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
                        <TableCell><Button className="btn btn-info" onClick={() => updateInvoice(ele)}>Pay</Button></TableCell>
                        <TableCell><Button className="btn btn-danger" onClick={() => deleteEle(ele)}>Delete</Button></TableCell>
                 </TableRow>
                 
                  )}
                  
                   </TableBody> 
                </Table>
            </div>
            </>:<Navigate to="/login"/>
            }
            
        </div>
    )
}
