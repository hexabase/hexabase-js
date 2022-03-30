

# Hexabase-sdk

### - Started:
  - Install:
    ```bash
      - yarn install
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
      - hxbUrlGraphql
      - hxbTokenGraphql
    ```

### - Using SDK
  - Configuration:
    ```bash
      import { Hexabase } from 'hexabase-sdk'

      const hexabase = Hexabase.createClient(
        hxbUrlGraphql,
        hxbTokenGraphql
      );
    ```