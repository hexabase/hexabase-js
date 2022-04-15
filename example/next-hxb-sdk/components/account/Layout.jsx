import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { userService } from '../../services';


function Layout({ children }) {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="col-md-6 offset-md-3 mt-5">
            {children}
        </div>
    );
}

export { Layout };
