# Hexabase-sdk

### - Started:
  - Install:
    ```bash
      - yarn install
    ```
  - Building:
    ```bash
      - yarn run build
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
    - login: login with email password
    - logout: logout user
    - get: get infomation user by token
  
  workspace
    - get: get workspaces and current workspace id
    - setCurrent: set workspace current with id
    - getCurrent: get workspaces id current
    - create: created workspace 
    - getPasswordPolicy: get workspace password policy
    - getFunctionality: get workspace functionlity
    - getUsage: get workspace usage
    - getGroupChildren: get workspace childrent in group
    - getTaskQueueList: get queue list
    - getTaskQueueStatus: get task queue status

  application
    - getProjectsAndDatastores: get app and ds
    - create: create app
    - getReports: get reports in project
    - getDataReport: get data of report

  datastore
    - getField: get field setting in Ds
    - getActions: get actions in Ds
    - getStatuses: get statuses in Ds
    - getAction: get field action setting in Ds

  item
    - get: get items in datastore
    - create: create new item
    - getHistories: get items histories
    - createItemId: create Itemid
    - getItemRelated: get item related in datastore
    - update: update item

  user
    - register: get user register info by confirmationId
    - confirm: get info user confirm by confirmationId
    - getPasswordExpire: check user password is expiry
```
