import { useCallback, useEffect, useState } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Chat from './chat';

export default function Layout({ children }: { children: React.ReactNode }) {
  
    return (
        <div className='flex flex-row h-screen'>
            <div className='w-2/6 '>
                <div className='fixed inset-y-0 left-0 w-2/6'>
                    <Sidebar />
                </div>
            </div>
            <main className='w-2/6'>{children}</main>
            <div className='w-2/6'>
                <div className='fixed inset-y-0 right-0 w-2/6 border-l '>
                    <Chat/>
                </div>
            </div>
        </div>
    );
}