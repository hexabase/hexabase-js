import { SetWsInput, WorkspacesRes } from '../../types/workspace';
import Workspace from '.';
import Auth from '../auth';
import AuthMw from '../middlware/auth';
require('dotenv').config();
/**
 * Test with class Workspace
 * @cmdruntest yarn jest src/lib/packages/workspace/workspace.test.ts
 */

const url = process.env.URL || '';
let tokenWs = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';
const taskId = process.env.TASKID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

// local variable in file for testing
const createWorkSpaceInput = {
  name: 'new Workspace'
};

const updateWorkspaceSettingsInput = {
   "payload": 
   {  
    "id": "622067ce9775b7b281cc2df8",
    "created_at": "2022-03-03T07:01:34.163Z",
    "name": "NguyenpdWs tesst 3",
    "plan_id": "61248d2dc4c0acb4465498ff",
    "plan_name": "Free Plan",
    "updated_at": "2022-09-30T07:04:47.506Z",
    "user_id": "620dd19661985350c2d26e55",
    "w_id": "622067ce9775b7b281cc2df8",
    "app_functions": {
      "app_settings": {
        "disable_delete_application": false,
        "disable_change_name": false,
        "disable_left_menu_extension": true,
        "disable_program_extension": true,
        "disable_role_settings": false,
        "enable_action_validation": true,
        "enable_field_values_validation": true
      },
      "app_templates": {
        "disable_new_application": false,
        "disable_save_templates": true
      },
      "csv_import": {
        "disable_csv_update": true,
        "disable_replace_import": true,
        "use_qr_download": false
      },
      "dashboards": {
        "disable_edit_dash_items": false,
        "disable_edit_dashboards": false
      },
      "data_reports": {
        "disable_csv_downloads": false,
        "disable_edit_reports": false,
        "disable_save_reports": true
      },
      "datastores": {
        "disable_borad_view": false,
        "disable_db_settings": false,
        "disable_grid_view": false,
        "disable_query": false,
        "disable_status_update": false
      },
      "item_view": {
        "disable_change_layouts": false,
        "disable_edit_actions": false,
        "disable_edit_fields": false,
        "disable_edit_statuses": false,
        "disable_pagination": false,
        "disable_pin_items": false,
        "hide_link_items": false
      }
    },
    "languages": [
      {
        "lang_cd": "en",
        "use": true,
        "name": "English",
        "default": false
      },
      {
         "lang_cd": "ja",
        "use": true,
        "name": "日本語",
        "default": true
      }
    ],
    "pwd_policy": {
      "expired_day": 30,
      "lockout_count": 5,
      "lockout_time": 5,
      "min_length": 6,
      "pattern_check_type": 0,
      "same_limit": 2,
      "use_expired_day": false,
      "use_language_en": true,
      "use_language_ja": true,
      "use_lockout_count": false,
      "use_lockout_time": false,
      "use_min_length": false,
      "use_pattern_check": false,
      "use_same_limit": false
    },
    "redirect": {
      "is_apply_redirect_url_for_disabled_users": false,
      "redirect_url": "http://localhost:4000/h/622067ce9775b7b281cc2df8 a"

    },
    "user_sessions": {
      "session_timeout_sec": 0
    },
    "ws_admin": ["620dd19661985350c2d26e55"],
    "ws_admin_users": [
      {
        "user_id": "620dd19661985350c2d26e55",
        "user_name": "username test",
        "media_link": "https://storage.googleapis.com/linker/pub/default.png",
        "email": "nguyenpd@b-eee.com",
        "access_key": "620dd1c661985350c2d26e56"
      }
    ],
    "ws_functions": 
      {
        "developer_functions": {
          "disable_beta": true,
          "disable_developer_mode": true,
          "disable_generate_token": true,
          "show_access_keys": 0
        },
        "group_settings": {
          "disable_group_import": true,
          "disable_group_roles": false,
          "disable_new_group": true,
          "disable_user_import": true
        },
        "new_workspaces": {
          "new_workspace": 2
        },
        "task_queue": {
          "show_task_list": 0
        },
        "ws_settings": {
          "disable_archive": false,
          "disable_change_logo": false,
          "disable_global_search": false,
          "disable_change_name": false,
          "disable_manage_admins": false,
          "disable_password_policy": true
        }
      }
    ,
    "ws_usage":
      {
        "datastores": 5,
        "items": 100,
        "users": 3,
        "storage_size": 5
      },
    "ws_key": (Math.random() + 1).toString(36).substring(7)
   }
}



/** run first testing  */
beforeAll( async () => {
  if (email && password) {
    const auth = new Auth(url);
    const {token, error} = await auth.login({email, password});
    if (token) {
      return tokenWs = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

describe('Workspace', () => {

  // testing get all workspaces
  describe('#create()', () => {
    it('should create workspace', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {w_id, error} = await workspace.create(createWorkSpaceInput);

      // expect response
      if (w_id) {

        expect(typeof w_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#updateWorkspaceSettings', () => {
    it('should update workspace settings', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {error} = await workspace.update(updateWorkspaceSettingsInput);
      if (!error) {
        expect(error).toBeNull;
      } else {
        throw new Error(`Error: ${error}`);
      }
    })
  })

  // testing get all workspaces
  describe('#setCurrent()', () => {
    it('should set current workspace', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const wsps: WorkspacesRes = await workspace.get();
      if (wsps && wsps.workspaces && wsps.workspaces.current_workspace_id) {
        const setCurrentWsPl: SetWsInput = {
          workspace_id: wsps.workspaces?.current_workspace_id
        };
        const {data, error} = await workspace.setCurrent(setCurrentWsPl);

        // expect response
        if (data) {
          expect(typeof data.success).toBe('boolean');
          expect(typeof data.data).toBe('object');
        } else {
          throw new Error(`Error: ${error}`);
        }
      }
    });
  });

  // testing get all workspaces
  describe('#get()', () => {
    it('should get all workspaces', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {workspaces, error} = await workspace.get();

      // expect response
      if (workspaces) {

        expect(typeof workspaces.current_workspace_id).toBe('string');
        expect(typeof workspaces.workspaces[0].workspace_name).toBe('string');
        expect(typeof workspaces.workspaces[0].workspace_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getCurrent()', () => {
    it('should get workspaces id current', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {wsCurrent, error} = await workspace.getCurrent();

      // expect response
      if (wsCurrent) {

        expect(typeof wsCurrent.workspace_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getPasswordPolicy()', () => {
    it('should get workspace password policy', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {wsPasswordPolicy, error} = await workspace.getPasswordPolicy(workspaceId);

      // expect response
      if (wsPasswordPolicy) {

        expect(typeof wsPasswordPolicy.expired_day).toBe('number');
        expect(typeof wsPasswordPolicy.use_expired_day).toBe('boolean');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getFunctionality()', () => {
    it('should get workspace functionlity', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {wsFunctionality, error} = await workspace.getFunctionality(workspaceId);

      // expect response
      if (wsFunctionality) {

        expect(typeof wsFunctionality.w_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getUsage()', () => {
    it('should get workspace usage', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {wsUsage, error} = await workspace.getUsage(workspaceId);

      // expect response
      if (wsUsage) {

        expect(typeof wsUsage.w_id).toBe('string');
        expect(typeof wsUsage.usage?.datastores).toBe('number');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getGroupChildren()', () => {
    it('should get workspace childrent in group', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {wsGroupChildren, error} = await workspace.getGroupChildren(workspaceId);

      // expect response
      if (wsGroupChildren) {

        expect(typeof wsGroupChildren.error).toBe('string');
        expect(typeof wsGroupChildren.count).toBe('number');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getTaskQueueList()', () => {
    it('should get queue list', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {taskQueueList, error} = await workspace.getTaskQueueList();

      // expect response
      if (taskQueueList) {

        expect(typeof taskQueueList).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getTaskQueueStatus()', () => {
    it('should get task queue status', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {taskQueueStatus, error} = await workspace.getTaskQueueStatus(taskId, workspaceId);

      // expect response
      if (taskQueueStatus) {

        expect(typeof taskQueueStatus.qt_id).toBe('string');
        expect(typeof taskQueueStatus.category).toBe('string');
        expect(typeof taskQueueStatus.created_at).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
});
