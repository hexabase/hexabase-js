import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';
import {createClient} from '@hexabase/hexabase-js' 

const { publicRuntimeConfig } = getConfig();
// const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const baseUrl = `https://hxb-graph.hexabase.com/graphql`
export const appService = {
    getAppAndDs
};

async function getAppAndDs(id) {
    const user = JSON.parse(localStorage.getItem('user'))
    const hexabase = await createClient({ url: baseUrl, token: user.token})
    const {appAndDs, error} = await hexabase.applications.getAppAndDsAsync(id)
    return appAndDs
}


