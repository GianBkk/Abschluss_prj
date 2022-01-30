import React , { Suspense} from 'react';
import { createResource } from './Api';
import Card from './components/Card';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Printer from './components/Printer';

const resource = createResource();

function App() {
  
  return (
    
      <Router>
        <div className='container my-5'>
          <Navbar />
          <Routes>
                <Route path='/' element={<Dashboard/>} />
                <Route path='/drucker' element={<Printer/>} />
          </Routes>
        </div>
      </Router>
  );
}

const Dashboard = () => {
  return(
    <Suspense fallback={<p>Loading ...</p>}>
      < Card resource={resource}/>
    </Suspense>
  )
}


export default App;

//<Suspense fallback={<p>Loading ...</p>}>
//          < Card resource={resource}/>
//        </Suspense>
