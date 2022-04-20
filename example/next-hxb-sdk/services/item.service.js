import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';
import {createClient} from '@hexabase/hexabase-js' 

const { publicRuntimeConfig } = getConfig();
// const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const baseUrl = `https://hxb-graph.hexabase.com/graphql`
export const itemService = {
    getItems,
    getItemDetail
};

async function getItems(datastoreId, projectId, getItemsParameters) {
    const user = JSON.parse(localStorage.getItem('user'))
    const hexabase = await createClient({ url: baseUrl, token: user.token})
    const {dsItems, error} = await hexabase.items.getItemsAsync(getItemsParameters, datastoreId, projectId)
    return dsItems
}

async function getItemDetail(datastoreId, itemId) {
    const user = JSON.parse(localStorage.getItem('user'))
    const hexabase = await createClient({ url: baseUrl, token: user.token})
    const {itemDetails, error} = await hexabase.items.getItemDetail(datastoreId, itemId)
    return itemDetails
}


