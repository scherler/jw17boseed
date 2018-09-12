import GenericApi from './GenericApi';

// backend url constructions
export const ENDPOINT = 'repos/';

/**
 * Proxy to the backend REST API.
 */
export default class RawPullApi extends GenericApi {

    repo = 'scherler/jenkins-testfiles';

    getEndpoint() {
        return `${ENDPOINT}${this.repo}/pulls`;
    }
    setRepo(newRepo) {
        this.repo = newRepo;
    }
    pull(number) {
        const url = this.getUrl(number);
        return this.fetch(url);
    }
}
const pullApi = new RawPullApi();
export { pullApi as PullApi };
