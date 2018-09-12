import { logging } from '@jenkins-cd/blueocean-core-js';
import { action, observable, computed } from 'mobx';
import { PullApi } from '../api/PullApi';

const logger = logging.logger('githubService');

export class GithubService {
    /**
     * pager is fetching data. log and detail
     * @type {boolean}
     */
    @observable pending = false;
    /**
     * Will be set in an error occurs.
     * @type {object|null}
     */
    @observable error = undefined;
    /**
     * The array of PRs generated from REST
     * @type {Array}
     */
    @observable pullsRaw = [];
    @observable currentPull = undefined;
    @computed get pulls() {
        return this.pullsRaw;
    }
    @computed get pull() {
        return this.currentPull;
    }
    static setRepo(repo) {
        PullApi.setRepo(repo);
    }
    static getRepo() {
        return PullApi.repo;
    }
    @action dismissError() {
        this.error = undefined;
    }
    @action getPull(number) {
        // while fetching we are pending
        this.pending = true;
        logger.debug('Fetching PR', number);
        return PullApi.pull(number)
            .then(action('Process data', response => {
                logger.debug('Fetching ended');
                this.currentPull = (response);
                this.pending = false;
            }))
            .catch(action('set error', err => {
                logger.error('Error fetching page', err);
                this.error = err;
                this.pending = false;
            })
        );
    }
    @action
    getPulls() {
        // while fetching we are pending
        this.pending = true;
        logger.debug('Fetching PRs');
        return PullApi.pull()
            .then(action('Process data', response => {
                console.log('xxx');
                logger.debug('Fetching ended');
                this.pullsRaw.replace(response);
                this.pending = false;
            }))
            .catch(action('set error', err => {
                console.log('xxx');
                logger.error('Error fetching page', err);
                this.error = err;
                this.pending = false;
            })
        );
    }
}
