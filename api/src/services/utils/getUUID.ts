import Nano from 'nano';
import conf from '../../config';

export default async (count: number = 1) => {
    const nano = Nano(conf.COUCHDB_URL);
    const result = await nano.uuids(count)
    return result.uuids;
}