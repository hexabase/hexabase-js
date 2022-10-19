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
      - config environment in .env file
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
      - yarn run test:auth
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
  - Run test hexabase storage:
    ```bash
      - yarn run test:storage
      or
      - yarn jest src/lib/packages/storage/storage.test.ts
    ```
### - Initialize for SDK Package
#### - Requirement:
  - credentials must obtain from hexabase: 
    ```bash
      - url
      - token
    ```

#### functions created:
```bash
  auth
    - login: login with email password
    - logout: logout user
  
  workspace:
    - get: get workspaces and current workspace id
    - getDetail: get detail workspace
    - setCurrent: set workspace current with id
    - getCurrent: get workspaces id current
    - create: created workspace 
    - getPasswordPolicy: get workspace password policy
    - getFunctionality: get workspace functionality
    - getUsage: get workspace usage
    - getGroupChildren: get workspace children in group
    - getTaskQueueList: get queue list
    - getTaskQueueStatus: get task queue status
    - update: update workspace settings
    - archive: archive workspace

  report:
    - getReports: get reports in project
    - getDataReport: get data of report
    
  application:
    - getProjectsAndDatastores: get app and ds
    - create: create app
    - get: get list application in a workspace
    - getTemplates: get templates of project
    - getDetail: get info project
    - delete: delete project in workspace
    - updateProjectTheme: update project theme in workspace
    - updateProjectName: update project name in workspace

  datastore:
    - getField: get field setting in Ds
    - getActions: get actions in Ds
    - getStatuses: get statuses in Ds
    - getAction: get field action setting in Ds
    - get: get all datastore in project
    - getDetail: get detail datastore in project
    - create: create datastore in project
    - validateDatastoreDisplayID: validate before update datastore in project
    - UpdateDatastoreName: update datastore setting in project
    - deleteDatastore: delete datastore in project

  item:
    - get: get items in datastore
    - create: create new item
    - getHistories: get items histories
    - createItemId: create Itemid
    - getItemRelated: get item related in datastore
    - update: update item
    - getItemDetail: get item detail
    - deleteItem: delete item in datastore
    - execute: execute action item in datastore

  user:
    - register: get user register info by confirmationId
    - confirm: get info user confirm by confirmationId
    - getPasswordExpire: check user password is expiry
    - get: get information user by token

  storage:
    - getFile: get data of file which attached in item
    - createFile: upload file to attached in item
    - delete: delete file which attached it item
```
