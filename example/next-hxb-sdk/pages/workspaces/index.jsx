import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, workspaceService } from '../../services';
import { useState, useEffect } from 'react';
import Link from 'next/link'

function Workspaces() {
    const router = useRouter();
    const [workspaces, setWorkspaces] = useState(null)
    // const history = useHistory();
    const gotoApp = (id) => {
      router.push(`/workspaces/${id}`);
    } 
    const getWorkspaces = async () => {
      const workspaces = await workspaceService.getWorkspaces()
        console.log("workspaces", workspaces);

      setWorkspaces(workspaces)
      return workspaces
    }
    useEffect( () => {
      const wsData = getWorkspaces()
    }, []);

    return (
      <div className="card">
        <h4 className="card-header">Workspace</h4>
        <div className='current-id-ws'>
          <p>Workspace current id: {workspaces?.current_workspace_id}</p>
        </div>
        <hr />
        <div>
          <table id="customers" className='table-body'>
            <thead>
              <tr>
                <th>Workspace Name</th>
                <th>Workspace Id</th>
              </tr>
            </thead>
            <tbody>
              {workspaces && workspaces.workspaces && 
                workspaces.workspaces.map(ws => {
                  return (
                    <tr >
                      <td><Link href={`workspaces/${ws.workspace_id}`}>{ws.workspace_name}</Link></td>
                      <td>{ws.workspace_id}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default Workspaces;

