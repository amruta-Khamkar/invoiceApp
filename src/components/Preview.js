import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ReactToPdf from 'react-to-pdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {Navigate} from 'react-router-dom'
import { sendEmail } from '../config/Myservice';

const options = {
    orientation: 'potrait',
    unit: 'in',
    format: 'A4'
}


export default function Preview() {
    const { state } = useLocation();
    console.log(state)
    const ref = React.createRef();

 const sendMail = () => {
    let abc = state.user.remail
    console.log(abc);
    const input = document.getElementById("divToPrint");
    console.log(input);
    alert("Mail sent!!");
    html2canvas(input, { useCORS: true }).then((canvas) => {
        const pdf = new jsPDF();
        const img = canvas.toDataURL(
            "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
        );
        pdf.addImage(img, "JPEG", 0, 0);
        const filedata = pdf.output("blob");
        // console.log(filedata);
        let formData = new FormData();
        formData.append("file", filedata, "samplefile");
        sendEmail(formData).then((res) => {
            console.log(res);
        });
    });
};
    return (
        <>
        { localStorage.getItem('_token')!=undefined? 
            <>
            <div   className="container p-3" style={{height:"100%",width:"100%"}}>
        <div >
            <nav class="navbar">
                <div class="container-fluid">
                    <Link to="/home" style={{textDecoration:"none"}}><Button variant='contained'>Go Back</Button></Link>
                    <Button className=" d-flex justify-content-sm-end">
                        <ReactToPdf targetRef={ref} filename={`_invoice.pdf`} options={options} x={0} y={0} scale={0.6}>
                            {({ toPdf }) => (
                                <Button onClick={() => {
                                    // sendData();
                                    toPdf();
                                }} variant="contained">
                                    Save
                                </Button>
                            )}
                        </ReactToPdf>
                    </Button>
                    <Button variant='contained' onClick={sendMail}>Send mail</Button>

                </div>
            </nav>
            <div ref={ref} id='divToPrint' className="container p-3" style={{border:"2px solid grey",height:"900px",width:"800px"}}>

                <nav class="navbar  navbar-light bg-light" >
                    <div class="container-fluid " style={{ height: "168px" }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTqmVxNASNzyzW9hM0Xoi8BsET7HlF4HpBkg&usqp=CAU" alt="" height="82px" width=" 185px" opacity=" 2" class="d-inline-block align-text-top" style={{ marginLeft: "15px", marginTop: "5px" }} />
                        <h2 className='text-end'>INVOICE</h2>
                    </div>
                </nav>
                <div className='row m-0 border'>
                    <div className='col text-left ml-4'>
                        <h6>From</h6>
                        <h5>Firm Email</h5>
                        <br />
                        <h6>To</h6>
                        <h5>{state.user.rname}</h5>
                        <h5>{state.user.remail}</h5>
                        <h5>{state.user.raddress}</h5>
                    </div>
                    <div className='col text-right mr-4'>
                        <h6 style={{ textAlign: "right", marginRight: "15px" }}>Status</h6>
                        <h5 style={{ textAlign: "right", marginRight: "15px", color: "red", fontSize: "25px" }}>{state.user.status}</h5>
                        <br />
                        <h6 style={{ textAlign: "right", marginRight: "15px" }}>Due Date</h6>
                        <h5 style={{ textAlign: "right", marginRight: "15px" }}>{state.user.rdate}</h5>
                        <h5 style={{ textAlign: "right", marginRight: "15px" }}>Amount</h5>
                        <h3 style={{ textAlign: "right", marginRight: "15px" }}>INR {state.amount}</h3>
                    </div>

                </div>
                <br />
                <div className=" mb-2">

                    <Table class="table  ">
                        <TableHead className='bg-light'>
                           
                                <TableCell scope="col">Sr No</TableCell>
                                <TableCell scope="col">Item</TableCell>
                                <TableCell scope="col">Qty</TableCell>
                                <TableCell scope="col">Price</TableCell>
                                <TableCell scope="col">Amount</TableCell>
                            
                        </TableHead>

                        <TableBody>
                            {state.user.product.map((ele, index) =>

                                <TableRow>
                                    <TableCell scope="row">{index + 1}</TableCell>
                                    <TableCell>{ele.title}</TableCell>
                                    <TableCell>{ele.quantity}</TableCell>
                                    <TableCell>{ele.price}</TableCell>
                                    <TableCell>{ele.total}</TableCell>
                                </TableRow>
                            )}

                        </TableBody>
                    </Table>
                </div>
            </div>


        </div>
        </div>
            </>:<Navigate to="/login"/>
        }
        
        </>
    )
}
