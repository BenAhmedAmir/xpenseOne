import Sheet from '../../models/sheet';
import Expense from '../../models/expense';
import attachmentRepository from '../../repositories/attachmentRepository';

const attachFile = async (doc: Sheet | Expense, data: any) => {
  const { originalname, mimetype } = data;
  const { id, rev } = doc;
  return await attachmentRepository.attachFile(
      id!,
      originalname,
      mimetype,
      Buffer.from(data.buffer),
      rev!
  )
}

const deleteAttachedFile = async (doc: Sheet | Expense, fileName: string) => {
    const { id, rev } = doc;
    return await attachmentRepository.deleteAttachment(id!, fileName, rev!);
}

export default { attachFile, deleteAttachedFile};

