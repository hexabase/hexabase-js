import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';
import {createClient} from 'hxb-sdk' 

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
    const {dsItems, error} = await hexabase.item.getItemsAsync(getItemsParameters, datastoreId, projectId)
    return dsItems
}

async function getItemDetail(datastoreId, itemId) {
    const user = JSON.parse(localStorage.getItem('user'))
    const hexabase = await createClient({ url: baseUrl, token: user.token})
    const {itemDetails, error} = await hexabase.item.getItemDetail(datastoreId, itemId)
    return itemDetails
}


