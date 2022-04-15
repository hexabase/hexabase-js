import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';
import {createClient} from 'hxb-sdk' 

const { publicRuntimeConfig } = getConfig();
// const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const baseUrl = `https://hxb-graph.hexabase.com/graphql`
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));
export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    register,
};

async function login(email, password) {
    let user = {}
    const hexabase = await createClient({ url: baseUrl, email, password })
    const {token, error} = await hexabase.auth.loginAsync({email, password})
    if(token && !error){
        const {userInfo, error} = await hexabase.user.userInfoAsync()
        user = userInfo
        user.token = token
        userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    return user
}

function logout() {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/auth/login');
}

function register(user) {
    return {user: 'nguyen'}
}
