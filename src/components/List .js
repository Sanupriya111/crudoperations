
import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import  { useEffect, useState } from "react";
import PreviewIcon from '@mui/icons-material/Preview';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Navigate, useNavigate,Link,useParams } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function List () {
  let params=useParams();
    const[user,setUser]=useState([]);
useEffect(()=>{
    axios.get('http://localhost:5000/users').then(({data})=>{
        console.log(data)
        setUser(data.data)
    })
    .catch((error)=>{

    });
},[])
const handleDelete= () =>{
  axios.delete("http://localhost:5000/delete-data/"+params.id)
.then((res)=>{
  if(res.status===200){
    alert("Data Sucussfully deleted");
    window.location.reload()

  }else Promise.reject();

})
.catch((err)=>alert("somthing went Wrong"))

}


// const handleEdit=()=>{
//   Navigate("/editform/"+_id)
// }
  return (
     <div>
        
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Mobile</StyledTableCell>
            <StyledTableCell align="right">Password</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
        {user.map((user,i)=>
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
              {user.name}
              </StyledTableCell>
              <StyledTableCell align="right">{user.email}</StyledTableCell>
              <StyledTableCell align="right">{user.phno}</StyledTableCell>
              <StyledTableCell align="right">{user.pwd}</StyledTableCell>
    

          <StyledTableCell align="right" style={{display:'flex'}}> 
<DeleteForeverIcon onClick={handleDelete}/><Link to={"/edit/"+user._id}><CreditScoreIcon/></Link><PreviewIcon/>
</StyledTableCell>
            </StyledTableRow>
            )}

        </TableBody>
             </Table>
    </TableContainer>
  




                    
                       
</div>
  )
}

export default List 