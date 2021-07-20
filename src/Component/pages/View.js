import React, { useState,useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


export default function View() {
    const [users, setUser] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [email, setEmail] = useState([]);
    const [mobile, setMobile] = useState([]);
    const [dob, setDob] = useState([]);

    useEffect(() => {
        getList()
    }, [])

    function getList() {
        fetch("http://localhost:3001/View").then((result) => {
            result.json().then((resp) => {
                // console.warn(resp)
                setUser(resp)
                console.log(resp);

            })
        })
    }

    function actionButton(params) {
        console.log("id:",params.data._id);
        fetch(`http://localhost:3001/View/${params.data._id}`, {
            method: 'delete'
        }).then((res) => {
            res.json().then((resp) => {
                console.warn(resp)
                console.log("resp:",resp)
            })
        })
        getList()
    }

    function UpdateButton(params){
        console.log("id:",params.data);
        fetch(`http://localhost:3001/View/${params.data._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params.data)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
                console.log("update:",resp)
                getList()
            })
        })
    }
           /*  
                 1)by click delete button we delete raw of table

                 2)by click on any cell like any first name or any lastname etc and edit text on cell  and by clicking on update we update data

                 3)to search through first name  let cursor on first name Header and do filter process

                 4) by click on lastname and dob header we do sorting on columbs
                   
                   
           */



    const columns=[
        {
            headerName:"ID", field:'_id'
        },
        {
            headerName:"FIRSTNAME", field:'firstName', filter:true, editable:true
        },
        {
            headerName:"LASTNAME", field:'lastName', sortable:true,editable:true
        },
        {
            headerName:"EMAIL", field:'email',editable:true
        },
        {
            headerName:"MOBILE", field:'mobile',editable:true
        },
        {
            headerName:"DOB", field:'dob', sortable:true,editable:true
        },
        {
            headerName: "DELETE",field:"_id",
            cellRendererFramework:(params)=><div>
            <button onClick={()=>actionButton(params)}>Delete</button>
            </div>
        },
        {
            headerName: "UPDATE",field:"_id",
            cellRendererFramework:(params)=><div >
            <button  onClick={()=>UpdateButton(params)}>Update</button>
            </div>
        },
    ]

    return (
        <div className="ag-theme-alpine" style={{height: 1000}}>
            <AgGridReact rowData={users} columnDefs={columns} />

        </div>
    )
}




//---------------------------------------------other method-------------------------------------------------------//





// import React, { useEffect, useState } from 'react'
// import './style.css'
// function View() {
//     const [users, setUser] = useState([]);
//     const [firstName, setFirstName] = useState([]);
//     const [lastName, setLastName] = useState([]);
//     const [email, setEmail] = useState([]);
//     const [mobile, setMobile] = useState([]);
//     const [dob, setDob] = useState([]);
//     const [userId, setUserId] = useState(null)

//     useEffect(() => {
//         getList()
//     }, [])
//     //------------------------------------------------------------------------------------------------------------------//
//     function getList() {
//         fetch("http://localhost:3333/comments").then((result) => {
//             result.json().then((resp) => {
//                 // console.warn(resp)
//                 setUser(resp)
//                 setFirstName(resp[0].firstName)
//                 setLastName(resp[0].lastName)
//                 setEmail(resp[0].email)
//                 setMobile(resp[0].mobile)
//                 setDob(resp[0].dob)
//                 setUserId(resp[0].userId)

//             })
//         })
//     }


//     //-----------------------------------------------------------------------------------------------------------------//
//     console.warn(users)
    
    
//     //-------------------------------------DELETE--------------------------------------------------------------------------/
//     function deleteUser(id) {
//         fetch(`http://localhost:3333/comments/${id}`, {
//             method: 'delete'
//         }).then((res) => {
//             res.json().then((resp) => {
//                 console.warn(resp)
//             })
//         })
//         getList()
//     }



    
//     //--------------------------------------------UPDATE--------------------------------------------------------------------------//

//     function selectUser(id) {
//         let item = users[id - 1];
//         setFirstName(item.firstName)
//         setLastName(item.lastName)
//         setEmail(item.email)
//         setMobile(item.mobile);
//         setDob(item.dob);
//         setUserId(item.id)
//     }

//     function updateUser() {
//         let item = { firstName, lastName, email, mobile, dob }
//         console.warn("item", item)
//         fetch(`http://localhost:3333/comments/${userId}`, {
//             method: 'PUT',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(item)
//         }).then((result) => {
//             result.json().then((resp) => {
//                 console.warn(resp)
//                 getList()
//             })
//         })
//     }


//     return (
//         <div className="App">
//             <table border="2 solid black" className="table">
//                 <tbody>
//                     <tr>
//                         <td>ID</td>
//                         <td>FIRSTNAME</td>
//                         <td>LASTNAME</td>
//                         <td>EMAIL</td>
//                         <td>MOBILE</td>
//                         <td>DOB</td>
//                         <td>DELETE</td>
//                         <td>UPDATE</td>
//                     </tr>
//                     {
//                         users.map((item, i) =>
//                             <tr key={i}>
//                                 <td>{item.id}</td>
//                                 <td>{item.firstName}</td>
//                                 <td>{item.lastName}</td>
//                                 <td>{item.email}</td>
//                                 <td>{item.mobile}</td>
//                                 <td>{item.dob}</td>
//                                 <td><button className="delete" onClick={() => deleteUser(item.id)}>Delete</button></td>
//                                 <td><button className="delete" onClick={() => selectUser(item.id)}>Update</button></td>
//                             </tr>
//                         )
//                     }
//                 </tbody>
//             </table>
//             <br />
//             <br />
//             <br />
//             <br />
//             <div className="tab">
//                 <div className="tab-wrapper">
//                 <h1>Update Data</h1>
//                     <div className="form">
//                         <div>
//                             <label htmlFor="firstName">First Name</label><br />
//                             <input type="text" className="fname" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} /><br /><br />
//                         </div>
//                         <div>
//                             <label htmlFor="lastName">Last Name</label><br />
//                             <input type="text" className="lname" value={lastName} onChange={(e) => { setLastName(e.target.value) }} /><br /><br />
//                         </div>
//                         <div>
//                             <label htmlFor="email">Email</label><br />
//                             <input type="text" className="ename" value={email} onChange={(e) => { setEmail(e.target.value) }} /><br /><br />
//                         </div >
//                         <div>
//                             <label htmlFor="mobile">Mobile</label><br />
//                             <input type="text" className="mname" value={mobile} onChange={(e) => { setMobile(e.target.value) }} /><br /><br />
//                         </div >
//                         <div>
//                             <label htmlFor="dateob">Dob</label><br />
//                             <input type="text" className="dname" value={dob} onChange={(e) => { setDob(e.target.value) }} /><br /><br />
//                         </div >
//                         <div className="createAccount">
//                             <button onClick={updateUser} >Update User</button> 
//                         </div>
//                     </div >
//                 </div>
//             </div>
//         </div>
//     );
// }
