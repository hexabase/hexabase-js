import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { appService } from '../../services';
import { useState, useEffect } from 'react';
import { Route, useParams } from "react-router-dom";
import Link from 'next/link'

function Application() {
  let url = `${window.location.origin.toString()}`
  const router = useRouter();
  const { id } = router.query
  const [appDs, setAppDs] = useState([])
  const getAppAndDsData = async (id) => {
    const appAndDs = await appService.getAppAndDs(id)
    console.log("appAndDs", appAndDs);
    if(appAndDs){
      setAppDs(appAndDs)
      return appAndDs
    }
  }
  useEffect( () => {
    getAppAndDsData(id)
    // return wsData
  }, []);
  return (
    <div className="card">
      <h4 className="card-header">Application</h4>
      <div>
        <table className='table-body'>
          <thead>
            <tr>
              <th>application id</th>
              <th>display id</th>
              <th>name</th>
              <th>datastores</th>
            </tr>
          </thead>
          <tbody>
            {appDs && 
              appDs.map(as => {
                console.log('as', as);
                return (<tr >
                  <td>{as.application_id}</td>
                  <td>{as.display_id}</td>
                  <td>{as.name}</td>
                  <td>{ as.datastores && as.datastores.map(ds => {
                    return (<ul>
                        <li><Link href={`${url}/pj/${as.application_id}/ds/${ds.datastore_id}`}>{ds.name}</Link>: {ds.datastore_id}</li>
                        {/* <li><Link href={`${url}/pj/${as.application_id}`}>{ds.name}</Link>: {ds.datastore_id}</li> */}
                      </ul>
                    )
                  })}</td>
                </tr>)
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Application;

