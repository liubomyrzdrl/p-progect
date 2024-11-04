import React from 'react';

import Link from 'next/link'
import Button from '@mui/material/Button';

const MainHeader = () => {
    return (
        <header className="flex justify-between items-center align-middle w-full bg-blue-500 px-7 py-5">
          <div className="text-white rounded-full">
             Logo
          </div>
           <div className="flex">
               <Link href={'auth/login'}>
                <Button variant="outlined" className="text-white border-white rounded-[5px] mr-[7px]">Login</Button>
             </Link>
             <Link href={'auth/register'}>
               <Button variant="outlined"  className="text-white border-white rounded-[5px]">Register</Button>
             </Link>
           </div>
          
        </header>
    );
};

export default MainHeader;