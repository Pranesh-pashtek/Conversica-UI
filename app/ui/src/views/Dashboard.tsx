import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Row, Col } from 'react-bootstrap';

export default function Dashboard() {
    
    
   

    const loc = useLocation();
    const [List, setList]: any = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const state = loc.state as CustomisedState;

    interface CustomisedState {
        Concid:any;
        Concsecret:any;
        client: any;
        secret: any;
        sfmctoken: String;
        subdomain: String;
        WEBAPPSubDomain:string;
        WEBAPPrefreshtoken:string;
        
    }   
    
    console.log("STATE::::::::::::::::::::::::::::::::::::::",state);
    
    useEffect(() => {
        // setTimeout(() => { 
    

            setIsLoad(true);
    if(state==null){
        const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const refreshtoken = urlParams.get('rt');
    const SubDomain = urlParams.get('subdomain');
    console.log("Dashboardrefreshtoken::::::::::::::::"+refreshtoken);
    console.log("DashboardrefSubDomain::::::::::::::::"+SubDomain);
//  setTimeout(() => { 
//     console.log("Dashboardrefreshtoken::::::::::::::::2222"+refreshtoken);
//     console.log("DashboardrefSubDomain::::::::::::::::22222"+SubDomain);
    axios({
        method: "post",
        url: "/api/RetriveDE",
        data: {
            refreshToken: refreshtoken,
            subdomain: SubDomain,
        },
    })
        .then(function (response) {
           
            if(response.data=="No Records"){
            console.log("RetriveDE[If]:::::::::::::::::::::::::::::::::", response.data);
            setList([{Name:"null",Skills:"null",Type:"null",Conversation:"null",Contact:"null"}]) //[{Name:"",Skills:"",Type:"",Conversation:"",Contact:""}]
            setIsLoad(false)
            }else{
                console.log("RetriveDE[ELSE]:::::::::::::::::::::::::::::::::", response.data);
                setList(response.data.Data)
                setIsLoad(false)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
       
    
        // }, 5000);
        
    }else{
            setIsLoad(true)
            axios({
                method: "post",
                url: "/api/DEcheck",
                data: {
                    sfmctoken: state.sfmctoken,
                subdomain: state.subdomain,
                SFMC_Clientid: state.client,
                SFMC_Clientsecret: state.secret,
                Conversica_Clientid: state.Concid,
                Conversica_Clientsecret: state.Concsecret,
                refreshToken:state.WEBAPPrefreshtoken,
                WEBAPPSubDomain :state.WEBAPPSubDomain
                },
            })
                .then(function (response) {
                    console.log("DestinationsDECHECK::::::::::::::::::::::::::", response.data.RefToken);
                    const REFToken = response.data.RefToken;
            axios({
                method: "post",
                url: "/api/RetriveDE",
                data: {
                    refreshToken: REFToken,
                    subdomain: state.WEBAPPSubDomain,
                },
            })
                .then(function (response) {
                    if(response.data=="No Records"){
                    console.log("RetriveDE[If]:::::::::::::::::::::::::::::::::", response.data);
                    setList([{Name:"null",Skills:"null",Type:"null",Conversation:"null",Contact:"null"}]) //[{Name:"",Skills:"",Type:"",Conversation:"",Contact:""}]
                    setIsLoad(false)
                    }else{
                        console.log("RetriveDE[ELSE]:::::::::::::::::::::::::::::::::", response.data);
                        setList(response.data.Data)
                        setIsLoad(false)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }).catch(function (error) {
                console.log(error);
                setIsLoad(false)
            });
    }      
    }, [])

   
    return (
        <div>
            <Row style={{ marginRight:"0px" }}>
                <Col className="col-2">
            <div className="sideBar" style={{ float: "left" }}>
                <Sidebar />
            </div>
            </Col>
            <Col className="col-10">
            <div className="App">
                <Table style={{ alignItems: "center",textAlignLast:"center" }} >
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
                            <th>Name</th>
                            <th>Skills</th>
                            <th>Type</th>
                            <th>Conversation</th>
                            <th>Contact</th>
                        </tr>
                    </thead>                    
                    <tbody >
                        {List.length > 0 ? List?.map((data: any) => (
                            <tr>
                                <td>{data.Name}</td>
                                <td>{data.Skills}</td>
                                <td>{data.Type}</td>
                                <td>{data.Conversation}</td>
                                <td>{data.Contact}</td>
                            </tr>
                        )) : <div className="demo-only demo-only_viewport" style={{ height: "6rem", position: "relative", width:"481%" }}>
                            <div role="status" className="slds-spinner slds-spinner_medium">
                                <span className="slds-assistive-text">Loading</span>
                                <div className="slds-spinner__dot-a"></div>
                                <div className="slds-spinner__dot-b"></div>
                            </div>
                        </div>}
                    </tbody>
                </Table>
            </div>
            </Col>
        </Row>
        </div>
    );
}
