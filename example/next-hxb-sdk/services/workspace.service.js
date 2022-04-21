import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';
import {createClient} from '@hexabase/hexabase-js' 

const { publicRuntimeConfig } = getConfig();
// const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const baseUrl = `https://hxb-graph.hexabase.com/graphql`
// const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));
// console.log("userSubject", userSubject)

export const workspaceService = {
    getWorkspaces,
    setWorkspace
};

// get all workspaces
async function getWorkspaces() {
    const user = JSON.parse(localStorage.getItem('user'))
    const hexabase = await createClient({ url: baseUrl, token: user.token})
    const {workspaces, error} = await hexabase.workspaces.getWorkspacesAsync()
    return workspaces
}

// set workspace current id
async function setWorkspace(id) {
    const user = JSON.parse(localStorage.getItem('user'))
    const setCurrentWsPl = {
        workspace_id: id
    }
    const hexabase = await createClient({ url: baseUrl, token: user.token})
    const {data, error} = await hexabase.workspaces.setCurrentWsAsync(setCurrentWsPl)
    return data
}


