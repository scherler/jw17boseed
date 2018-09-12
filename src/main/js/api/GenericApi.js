import es6Promise from 'es6-promise';
es6Promise.polyfill();
import { logging } from '@jenkins-cd/blueocean-core-js';
import Fetch from '../helper/Fetch';

const baseUrl = 'https://api.github.com';
const logger = logging.logger('genericApi');
export default class GenericApi {

    constructor(fetch) {
        this.fetch = fetch || Fetch.fetchJSON;
    }
    getEndpoint() {
        this._throwError('needs valid endpoint');
    }
    _throwError(errorString) {
        logger.error(errorString);
        throw new Error(errorString);
    }
    getUrl(subUrl) {
        let url = `${baseUrl}/${this.getEndpoint()}`;
        if (subUrl) {
            url += `/${subUrl}`;
        }
        return url;
    }
}
