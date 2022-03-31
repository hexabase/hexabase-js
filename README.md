

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
      - yarn jest src/hexabase.test.ts
    ```
  - Run test hexabase application:
    ```bash
      - yarn jest src/lib/packages/application/application.test.ts
    ```
  - Run test hexabase auth:
    ```bash
      - yarn jest src/lib/packages/auth/auth.test.ts
    ```
  - Run test hexabase user:
    ```bash
      - yarn jest src/lib/packages/user/user.test.ts
    ```
  - Run test hexabase workspace:
    ```bash
      - yarn jest src/lib/packages/workspace/workspace.test.ts
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