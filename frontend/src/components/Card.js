import { MDBContainer } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Card = ({resource}) => {
    const info = resource.info.read();
    const [data, setData] = useState()
    const [haveData, setHaveData] = useState(false)
    const prtName = ['Drawer1', 'Drawer2', 'Lcf1', 'Lcf2']
   
    const ChartData = async (drawer1, drawer2, lcf1, lcf2, name) => {
        const datasetsArray = []
        for (let i = 0; i < name.length; i++) {
            let data = {
                labels: prtName,
                datasets: [{
                    label: name[i],
                    data: [drawer1[i], drawer2[i], lcf1[i], lcf2[i]],
                    backgroundColor: ["rgba(66,133,244,0.55"]
                }]
            }
            datasetsArray.push(data)
        } 
        setData(datasetsArray)
    } 

    const AddData = (drawer1, drawer2, lcf1, lcf2, name) => {
        info.map((info) => {
            drawer1.push(info.drawer1)
            drawer2.push(info.drawer2)
            lcf1.push(info.lcf1)
            lcf2.push(info.lcf2)
            name.push(info.name)
            return true
        })
    }

    useEffect(() => {
        const tempDrawer1Array = [];
        const tempDrawer2Array = [];
        const tempLcf1Array = [];
        const tempLcf2Array = [];
        const tempNameArray = [];

        const handleChange = async () => {
            AddData(tempDrawer1Array, tempDrawer2Array,tempLcf1Array, tempLcf2Array, tempNameArray);
            if(tempNameArray.length !== 0){
                await ChartData(tempDrawer1Array, tempDrawer2Array, tempLcf1Array, tempLcf2Array, tempNameArray);
                setHaveData(true)
            } else{
                console.log('no Data')
            }
            
 
        } 
        
        if (!data) {
            handleChange();  
        }
    },[data])

    
    if (!haveData) {
        return (
            <div className='container-fluid text-center'>
                    <h1 className='h2 mb-2 mt-5'>Dashboard</h1>
                    <button className='btn btn-primary mt-5' type='button'>Add Printer</button>
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
                    <div className='d-sm-flex d-flex flex-wrap'>
                        {data.map((data, index) => (
                            <MDBContainer key={index} className='w-sm-50 w-lg-50 mb-5 border '>
                                <Bar data={data} />
                            </MDBContainer>
                        ))} 
                           
                    </div>
                    <button className='btn btn-primary mt-5' type='button'>Add Printer</button> 
                </div>
            </main>
        )
    }
    
    
  
};

export default Card;
