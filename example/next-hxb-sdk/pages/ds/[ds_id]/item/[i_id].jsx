import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { itemService } from '../../../../services';

function ItemDetail() {
  const router = useRouter();
  const { ds_id, i_id } = router.query

  const [item, setItem] = useState([])
    let url = `${window.location.origin.toString()}`
    const getItemDetail = async (ds_id, i_id) => {
      const itemDetails = await itemService.getItemDetail(ds_id, i_id)
      if(itemDetails){
        setItem(itemDetails)
        return itemDetails
      }
    }
    useEffect( () => {
      getItemDetail(ds_id, i_id)
    }, []);
    console.log("item", item);
    return (
      <div className="card">
        <h4 className="card-header">Item Detail</h4>
        <div>
          <table className='table-body'>
            <thead>
              <tr>
                <th>title</th>
                <th>field values</th>
                <th>item actions</th>
                <th>status actions</th>
                <th>status lists</th>
              </tr>
            </thead>
            <tbody>
              {item && 
                <tr >
                    <td>{item.title}</td>
                    <td>{item.field_values && item.field_values.map(fv => {
                      return (<ul>
                        <li>{fv.field_name}</li>
                      </ul>)
                    })}
                    </td>
                    <td>{item.item_actions && item.item_actions.map(ia=> {
                      return (<ul>
                        <li>{ia.action_name}</li>
                      </ul>)
                    })}
                    </td>
                    <td>{item.status_actions && item.status_actions.map(sa=> {
                      return (<ul>
                        <li>{sa.action_name}</li>
                      </ul>)
                    })}
                    </td>
                    <td>{item.status_list && item.status_list.map(sl=> {
                      return (<ul>
                        <li>{sl.status_name}</li>
                      </ul>)
                    })}
                    </td>

                  </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default ItemDetail;

