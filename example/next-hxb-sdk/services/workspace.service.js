import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';
import {createClient} from 'hxb-sdk' 

const { publicRuntimeConfig } = getConfig();
// const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const baseUrl = `https://hxb-graph.hexabase.com/graphql`
// const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));
// console.log("userSubject", userSubject)
export const workspaceService = {
    getWorkspaces
};

async function getWorkspaces() {
    const user = JSON.parse(localStorage.getItem('user'))
    const hexabase = await createClient({ url: baseUrl, token: user.token})
    const {workspaces, error} = await hexabase.workspace.getWorkspacesAsync()
    return workspaces
}


