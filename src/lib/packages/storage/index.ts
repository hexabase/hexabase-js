import { DELETE_STORAGE, FILE_ATTACHMENT, GET_DOWNLOAD_FILE } from '../../graphql/storage';
import { HxbAbstract } from '../../../HxbAbstract';
import { ModelRes } from '../../util/type';
import { DtItemFileAttachment, DtStorageResp, GetDownloadFileRes, ItemFileAttachmentPl, ItemFileAttachmentRes } from '../../types/storage';

export default class Storage extends HxbAbstract {
  /**
   * function GetDownloadFile: get download file
   * @returns any
   */
  async GetDownloadFile(getDownloadFileId: string): Promise<GetDownloadFileRes> {
    const data: GetDownloadFileRes = {
      getDownloadFile: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: any = await this.client.request(GET_DOWNLOAD_FILE, { getDownloadFileId });

      data.getDownloadFile = res.getDownloadFile;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function createFileAttachment: upload file attachment
   * @returns any
   */
   async createFileAttachment(payload: ItemFileAttachmentPl): Promise<ItemFileAttachmentRes> {
    const data: ItemFileAttachmentRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtItemFileAttachment = await this.client.request(FILE_ATTACHMENT, { payload });

      data.data = res.createItemFileAttachment;
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
  async delete(fileId: string): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtStorageResp = await this.client.request(DELETE_STORAGE, fileId);

      data.data = res.deleteStorage;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }
}
