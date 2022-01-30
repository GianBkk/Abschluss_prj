import React from 'react';

const Printer = () => {

    const addPrinterHandler = () => {
        
    }


  return (
    <div className='container-fluid' align='center'>
        <form className=' mt-2 p-5'>
            <div className='form-group w-50 text-start ' >
                <label for='printerNameInput'>Drucker Name:</label>
                <input type='text' className='form-control' id='printerNameInput' aria-describedby='printerAddHelp' placeholder='Input Name ...'/>
            </div>
            <div className='form-group w-50 text-start ' >
                <label for='printerNameInput'>Drucker IP:</label>
                <input type='text' className='form-control' id='printerNameInput' aria-describedby='printerAddHelp' placeholder='Input IP ...'/>
            </div>
            <button type="submit" class="btn btn-primary">Add Printer</button>
        </form>


    </div>
  );
};

export default Printer;
