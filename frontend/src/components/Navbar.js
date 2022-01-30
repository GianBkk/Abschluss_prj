import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixced-top'>
          <div className='container-fluid'>
              <a className='navbar-brand'>Dashboard</a>
              <button 
                className='navbar-toggler'
                type='button'
                data-mdb-toggle='collapse'
                data-mdb-target='#navbarNav'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='Toggle navigation'
                >
                  <span className='fas fa-bars'></span>
              </button>
          </div>
          <div className='collapse navbar-collapse' id='navbarNav'>
              <ul className='navbar-nav'>
                  <li className='nav-item'>
                      <Link to='/' className='nav-link active' aria-current='page'>Home</Link>
                  </li>
                  <li className='nav-item'>
                      <a className='nav-link' href='#'>HTL</a>
                  </li>
                  <li className='nav-item'>
                    <Link to='/drucker' className='nav-link active' aria-current='page'>Drucker</Link>
                  </li>
              </ul>
          </div>
      </nav>


  </header>;
};

export default Navbar;
