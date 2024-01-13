import { CouchDbRepository } from './couchDbRepository';

class attachmentRepository extends CouchDbRepository {
  constructor() {
    super();
  }
  public async deleteAttachment(sheetId: string, originalName: string, rev: string) {
     return await this.db.attachment.destroy(sheetId, originalName, { rev });
  }
  public  async attachFile(sheetId: string, originalName: string, contentType: string, data : any, rev: string) {
    return await this.db.attachment.insert(
        sheetId,
        originalName,
        data,
        contentType,
        {
          rev,
        }
    );
  }
}
export default new attachmentRepository();
