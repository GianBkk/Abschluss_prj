import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const Printer = () => {
    const [name,setName] = useState();
    const [ip, setIp] = useState();
    const [model, setModel] = useState();
    const [pending, setPending] = useState(false);
    const hist = useNavigate();
    const postData = (e) => {
        e.preventDefault();
        setPending(true)
        axios.post(`http://192.168.0.14:8000/printer`, {
            name,
            ip,
            model
        }).then(res => {
            console.log('change routes', res);
            setPending(false)
            hist('/')
        }).catch(err => console.log(err));
        
    }

    
  return (
    <div className='container-fluid' align='center'>

        {pending ? (<h1>Loading...</h1>) : (
            <form className=' mt-2 p-5' onSubmit={postData}>
            <div className='form-group w-50 text-start ' >
                <label for='printerNameInput'>Drucker-Name:</label>
                <input type='text' value={name} 
                    className='form-control' 
                    id='printerNameInput' 
                    aria-describedby='printerAddHelp' 
                    placeholder='Input Name ...' 
                    onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className='form-group w-50 text-start ' >
                <label for='printerNameInput'>Drucker-IP:</label>
                <input type='text' value={ip} className='form-control' id='printerNameInput' aria-describedby='printerAddHelp' placeholder='Input IP ...' onChange={(e) => setIp(e.target.value)}/>
            </div>
            <div className='form-group w-50 text-start ' >
                <label for='printerNameInput'>Drucker-Modell:</label>
                <input type='text' value={model} className='form-control' id='printerNameInput' aria-describedby='printerAddHelp' placeholder='Input Model ...' onChange={(e) => setModel(e.target.value)}/>
            </div>
            <button type="submit" class="btn btn-primary">Add Printer</button>
        </form>
        )}
            
    </div>
  );
};

export default Printer;
