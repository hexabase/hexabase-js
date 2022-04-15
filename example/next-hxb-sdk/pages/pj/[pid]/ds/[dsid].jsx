import { useRouter } from 'next/router';
import { itemService } from '../../../../services';
import { useState, useEffect } from 'react';
import Link from 'next/link'

function Items() {
    const router = useRouter();
    const { pid, dsid } = router.query
    const [items, setItems] = useState([])
    let url = `${window.location.origin.toString()}`
    const getItems = async (pid, dsid) => {
      let getItemsParameters = {
        page: 1,
        per_page: 0
      }
      const dsItems = await itemService.getItems(dsid, pid, getItemsParameters)
      if(dsItems){
        setItems(dsItems)
        return dsItems
      }
    }
    useEffect( () => {
      getItems(pid, dsid)
    }, []);
    return (
      <div className="card">
        <h4 className="card-header">Item</h4>
        <div>
          <table className='table-body'>
            <thead>
              <tr>
                <th>title</th>
                <th>item id</th>
                <th>status id</th>
              </tr>
            </thead>
            <tbody>
              {items && items.items && 
                items.items.map(i => {
                  return (<tr >
                    <td><Link href={`${url}/ds/${i.d_id}/item/${i.i_id}`}>{i.title ? i.title : i.i_id}</Link></td>
                    <td>{i.i_id}</td>
                    <td>{i.status_id}</td>
                  </tr>)
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default Items;

