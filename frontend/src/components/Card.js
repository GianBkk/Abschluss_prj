import { MDBContainer } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
Chart.register(...registerables);

const Card = ({resource}) => {
    const info = resource.info.read();
    const [data, setData] = useState([]);
    const [haveData, setHaveData] = useState(false);
    const prtName = ['Drawer1', 'Drawer2', 'Lcf1', 'Lcf2'];
    const [inds, setInds] = useState();
   
    const ChartData = async (drawer1, drawer2, lcf1, lcf2, name, ind) => {
        const datasetsArray = []
        const idArray = []
        for (let i = 0; i < name.length; i++) {
            let data = {
                labels: prtName,
                datasets: [{
                    label: name[i],
                    data: [drawer1[i], drawer2[i], lcf1[i], lcf2[i]],
                    backgroundColor: ["rgba(66,133,244,0.55"]
                }]
            }
            idArray.push(ind[i])
            datasetsArray.push(data)
        } 
        setData(datasetsArray)
        setInds(idArray)
    } 

    const AddData = (drawer1, drawer2, lcf1, lcf2, name, ind) => {
        info.map((info) => {
            drawer1.push(info.drawer1)
            drawer2.push(info.drawer2)
            lcf1.push(info.lcf1)
            lcf2.push(info.lcf2)
            name.push(info.name)
            ind.push(info.printerid)
            return true
        })
    }

    const DeleteChart = (ids) => {
        if(window.confirm('Are you sure you want to delete')){
            axios.delete(`http://${process.env.HOST_IP}:8000/printer/${inds[0]}`)
        .then()
        .catch(err => console.log(err))
        }
        
    }

    useEffect(() => {
        const tempDrawer1Array = [];
        const tempDrawer2Array = [];
        const tempLcf1Array = [];
        const tempLcf2Array = [];
        const tempNameArray = [];
        const tempIdArray = [];

        const handleChange = async () => {
            AddData(tempDrawer1Array, tempDrawer2Array,tempLcf1Array, tempLcf2Array, tempNameArray, tempIdArray);
            if(tempNameArray.length !== 0){
                await ChartData(tempDrawer1Array, tempDrawer2Array, tempLcf1Array, tempLcf2Array, tempNameArray, tempIdArray);
                setHaveData(true)
            } else{
                console.log('no Data')
            }
            
 
        } 
        
        if (data.length === 0) {
            handleChange();
        }
    },[data])

    
    if (!haveData) {
        return (
            <div className='container-fluid text-center'>
                    <h1 className='h2 mb-2 mt-5'>Dashboard</h1>
                    <Link to='/drucker'>
                        <button className='btn btn-primary mt-5' type='button'>
                            Add Printer
                        </button>
                    </Link>
                    <h1 className='h6 pt-5 mt-5'>Nothing to show!</h1>                    
            </div>
        )
    } else if(data){
        return (
            <main>
                <div className='container-fluid'>
                    <div className='mb-5 d-flex text-center bg light'></div>
                    <h1 className='h3 mb-2 text-center'>Dashboard</h1>
                </div>
                <div className='row text-center'>
                    <div className='d-sm-flex d-flex flex-wrap' >
                        {data.map((data, index) => (
                            <div className='w-100 text-end' >
                                <MDBContainer key={index} className='mb-5 border'>
                                    <Bar data={data} />
                                </MDBContainer>
                                <button onClick={() => DeleteChart(inds[index])} 
                                    className='btn btn-danger'>Delete
                                </button>
                               
                            </div>
                        ))} 
                           
                    </div>
                    <Link to='/drucker'>
                        <button className='btn btn-primary mt-5' type='button'>
                            Add Printer
                        </button>
                    </Link>
                     
                </div>
                
            </main>
        )
    }
    
    
  
};

export default Card;
