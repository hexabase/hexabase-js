import { DELETE_STORAGE, FILE_ATTACHMENT, GET_DOWNLOAD_FILE } from '../../graphql/storage';
import { HxbAbstract } from '../../../HxbAbstract';
import { ModelRes } from '../../util/type';
import { DtGetDownloadFile, DtItemFileAttachment, DtStorage, GetDownloadFileRes, ItemFileAttachmentPl, ItemFileAttachmentRes } from '../../types/storage';

export default class Storage extends HxbAbstract {
  /**
   * function get: get download file
   * @returns any
   */
  async getFile(id: string): Promise<GetDownloadFileRes> {
    const data: GetDownloadFileRes = {
      file: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtGetDownloadFile = await this.client.request(GET_DOWNLOAD_FILE, { id });

      data.file = res.getDownloadFile;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function createFileAttachment: upload file attachment
   * @returns any
   */
   async createFile(payload: ItemFileAttachmentPl): Promise<ItemFileAttachmentRes> {
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
      const res: DtStorage = await this.client.request(DELETE_STORAGE, fileId);

      data.data = res.deleteStorage;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }
}
