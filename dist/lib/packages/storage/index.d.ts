import { HxbAbstract } from '../../../HxbAbstract';
import { ModelRes } from '../../util/type';
import { GetDownloadFileRes, ItemFileAttachmentPl, ItemFileAttachmentRes } from '../../types/storage';
export default class Storage extends HxbAbstract {
    getFile(id: string): Promise<GetDownloadFileRes>;
    createFile(payload: ItemFileAttachmentPl): Promise<ItemFileAttachmentRes>;
    delete(fileId: string): Promise<ModelRes>;
}
