import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from '../services';
export  { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x =>setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

    // only show nav when logged in
    if (!user) return null;
    
    return (
        <div className='top-header'>
            <div className='header-body'>
                <h1 className='title-header'>HEXABASE</h1>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
}