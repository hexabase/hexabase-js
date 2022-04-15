import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import '../styles/globals.css';

import { userService } from '../services';
import { Nav, Alert, LeftBar } from '../components';
import {createClient} from 'hxb-sdk' 
export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const baseUrl = `https://hxb-graph.hexabase.com/graphql`
    
    useEffect(() => {
       
        // on initial load - run auth check 
        authCheck(router.asPath);
        
        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

    }, []);

    function authCheck(url) {
        setUser(userService.userValue);
        
        const publicPaths = ['/auth/login', '/auth/register'];
        const path = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/auth/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (
        <>
            <Head>
                <title>Next Hexabase SDK</title>
                
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
            </Head>
            <div className={`app-container ${user ? 'bg-light' : ''}`}>
                <Nav />
                <div className='left-bar'>
                    <LeftBar />
                </div>
                <div className='main'>
                    <div className='main-top'></div>
                    <div className='main-body'>
                    <Alert />
                    {authorized &&
                        <Component {...pageProps} />
                    }
                    </div>
                </div>
            </div>
        </>
    );
}
