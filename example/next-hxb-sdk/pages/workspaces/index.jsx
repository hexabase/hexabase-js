import Link from 'next/link'
import { workspaceService , appService} from '../../services';
import { useState, useEffect } from 'react';

function Workspaces() {
  let url = `${window.location.origin.toString()}`
  const [workspaces, setWorkspaces] = useState(null)
  const [wsCurrent, setWsCurrent] = useState(null);
  const [appDs, setAppDs] = useState([]);

  const getAppAndDsData = async (id) => {
    const appAndDs = await appService.getAppAndDs(id)
    if (appAndDs) {
      setAppDs(appAndDs)
      return appAndDs
    }
  }

  const getWorkspaces = async () => {
    const resWorkspaces = await workspaceService.getWorkspaces()
    setWorkspaces(resWorkspaces);
    setWsCurrent(resWorkspaces.current_workspace_id);
  }

  const resetWorkspace = async (wid) => {
    setWorkspaces({
      ...workspaces,
      current_workspace_id: wid
    });
  }
  
  const setCurrentWs = async (wsId) => {
    return await workspaceService.setWorkspace(wsId);
  }
  
  const handleChange = async (e) => {
    resetWorkspace(e.target.value);
    const data = await setCurrentWs(wsCurrent);
    if(data.success) {
      setWsCurrent(e.target.value);
    }
  }
  
  useEffect(() => {
    getWorkspaces();
  }, []);

  useEffect(() => {
    getAppAndDsData(wsCurrent);
  }, [wsCurrent]);

  return (
    <div className="card">
      <h4 className="card-header">Application in workspace</h4>
      <div className='current-id-ws'>
        <div><span> workspace:</span>
          <select
            value={workspaces?.current_workspace_id}
            onChange={(e) => handleChange(e)}
          >{workspaces && workspaces.workspaces && workspaces.workspaces.map(ws => {
            return (
              <option value={ws.workspace_id}> {ws.workspace_name}</option>
            )
          })}
          </select>
        </div>
      </div>
      <hr />
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
                return (<tr >
                  <td>{as.application_id}</td>
                  <td>{as.display_id}</td>
                  <td>{as.name}</td>
                  <td>{as.datastores && as.datastores.map(ds => {
                    return (<ul>
                      <li><Link href={`${url}/pj/${as.application_id}/ds/${ds.datastore_id}`}>{ds.name}</Link>: {ds.datastore_id}</li>
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

export default Workspaces;

