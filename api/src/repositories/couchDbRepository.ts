import Nano from 'nano';
import conf from '../config';

export class CouchDbRepository {
  readonly nano: Nano.ServerScope;
  readonly db: Nano.DocumentScope<unknown>;

  constructor() {
    this.nano = Nano(conf.COUCHDB_URL);
    this.db = this.nano.db.use(conf.COUCHDB_DBNAME);
  }
}
