import { DELETE_STORAGE, GET_DOWNLOAD_FILE } from '../../graphql/storage';
import { HxbAbstract } from '../../../HxbAbstract';
import { ModelRes } from '../../util/type';
import { StorageResp } from '../../types/storage';

export default class Storage extends HxbAbstract {
  /**
   * function GetDownloadFile: get download file
   * @returns any
   */
  async GetDownloadFile(): Promise<any> {
    const data: any = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: any = await this.client.request(GET_DOWNLOAD_FILE);

      data.data = res.userPasswordExpiry;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function deleteStorage: delete storage
   * @param fileId: string is required
   * @returns ModelRes
   */
  async deleteStorage(fileId: string): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: StorageResp = await this.client.request(DELETE_STORAGE, fileId);

      data.data = res.deleteStorage;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }
}
