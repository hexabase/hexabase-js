# Hexabase-sdk

### - Started:
  - Install:
    ```bash
      - yarn install
    ```
  - create file ```.env``` from ```.env.test``` then Config file testing at ```.env```:
    ```bash
      - cp .env.test .env
      - config enviroment in .env file
    ```
  - Run test hexabase client:
    ```bash
      - yarn run test:client
      or
      - yarn jest src/hexabase.test.ts
    ```
  - Run test hexabase application:
    ```bash
      - yarn run test:application
      or
      - yarn jest src/lib/packages/application/application.test.ts
    ```
  - Run test hexabase auth:
    ```bash
      - yarn run test:dataauthstore
      or
      - yarn jest src/lib/packages/auth/auth.test.ts
    ```
  - Run test hexabase user:
    ```bash
      - yarn run test:user
      or
      - yarn jest src/lib/packages/user/user.test.ts
    ```
  - Run test hexabase workspace:
    ```bash
      - yarn run test:workspace
      or
      - yarn jest src/lib/packages/workspace/workspace.test.ts
    ```
  - Run test hexabase datastore:
    ```bash
      - yarn run test:datastore
      or
      - yarn jest src/lib/packages/datastore/datastore.test.ts
    ```
### - Initialize for SDK Packge
#### - Requirement:
  - credentials must obtain from hexabase: 
    ```bash
      - url
      - token
    ```

### - Using SDK
  - Configuration:
    ```bash
      import { Hexabase } from 'hexabase-sdk'

      const hexabase = Hexabase.createClient({url, token});
    ```

#### functions created:
```bash
  auth
    - userInfoAsync: get user info by token
    - loginAsync: login with email password
  
  workspace
    - setCurrentWsAsync: set workspace current with id
    - createWorkspaceAsync: created workspace 
    - getWorkspacesAsync: get workspaces and current workspace id
    - getCurrentWorkspaceAsync: get workspaces id current
    - getPasswordPolicyAsync: get workspace password policy
    - getFunctionalityAsync: get workspace functionlity
    - getUsageAsync: get workspace usage
    - getGroupChildrenAsync: get workspace childrent in group
    - getTaskQueueListAsync: get queue list
    - getTaskQueueStatusAsync: get task queue status

  application
    - getAppAndDsAsync: get app and ds
    - createAppAsync: create app

  datastore
    - getFieldSettingsAsync: get field setting in Ds
    - getActionsAsync: get actions in Ds
    - getStatusesAsync: get statuses in Ds
    - getActionSettingAsync: get field action setting in Ds

  item
    - getItemsAsync: get items in datastore
    - getItemsHistories: get items histories
    - createItemId: create Itemid
    - createNewItem: create new item
    - getItemRelated: get item related in datastore

  user
    - userRegisterAsync: get user register info by confirmationId
    - userPasswordExAsync: check user password is expiry
    - userConfirmAsync: get info user confirm by confirmationId
```
