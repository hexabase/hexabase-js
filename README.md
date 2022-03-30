

# Hexabase-sdk

### - Started:
  - Install:
    ```bash
      - yarn install
    ```
  - Run test:
    ```bash
      - yarn jest src/hexabase.test.ts
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