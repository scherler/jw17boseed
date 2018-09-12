import es6Promise from 'es6-promise';
es6Promise.polyfill();
import isoFetch from 'isomorphic-fetch';

export function clone(obj) {
    if (!obj) return obj;
    return JSON.parse(JSON.stringify(obj));
}
/**
 * This method checks for for 2XX http codes. Throws error it it is not.
 * This should only be used if not using fetch or fetchJson.
 */
export function checkStatus(response) {
    if (response.status >= 300 || response.status < 200) {
        const message = `fetch failed: ${response.status} for ${response.url}`;
        const error = new Error(message);
        error.response = response;
        throw error;
    }
    return response;
}
/**
 * REturns the json body from the response. It is only needed if
 * you are using FetchUtils.fetch
 *
 * Usage:
 * FetchUtils.fetch(..).then(FetchUtils.parseJSON)
 */
export function parseJSON(response) {
    // FIXME: workaround for status=200 w/ empty response body that causes error in Chrome
    // server should probably return HTTP 204 instead
    return response.json()
        .catch((error) => {
            if (error.message.indexOf('Unexpected end of JSON input') !== -1) {
                return {};
            }
            throw error;
        });
}
/* eslint-disable no-param-reassign */
/**
 * Parses the response body for the error generated in checkStatus.
 */
export function parseErrorJson(error) {
    return error.response.json().then(
        body => {
            error.responseBody = body;
            throw error;
        },
        () => {
            error.responseBody = null;
            throw error;
        });
}
/* eslint-enable no-param-reassign */
/**
 * Error function helper to call a callback on a rejected promise.
 * if callback is null, log to console). Use .catch() if you know it
 * will not be null though.
 *
 * Usage;
 * fetchJson(..).catch(FetchUtils.onError(error => //do something)
 */
export function onFetchError(errorFunc) {
    return error => {
        if (errorFunc) {
            errorFunc(error);
        } else {
            console.error(error);
        }
    };
}
const Fetch = {
    /**
     * Adds same-origin option to the fetch.
     */
    sameOriginFetchOption(options = {}) {
        const newOpts = clone(options);
        newOpts.credentials = newOpts.credentials || 'same-origin';
        return newOpts;
    },
    /**
     * Fetch JSON data.
     * <p>
     * Utility function that can be mocked for testing.
     *
     * @param {string} url - The URL to fetch from.
     * @param {Object} [options]
     * @param {function} [options.onSuccess] - Optional callback success function.
     * @param {function} [options.onError] - Optional error callback.
     * @param {Object} [options.fetchOptions] - Optional isomorphic-fetch options.
     * @returns JSON body.
     */
    fetchJSON(url, {onSuccess, onError, fetchOptions, disableCapabilites, ignoreRefreshHeader} = {}) {
        let future = isoFetch(url, Fetch.sameOriginFetchOption(fetchOptions));
        future = future.then(checkStatus)
            .then(parseJSON, parseErrorJson);
        if (onSuccess) {
            return future.then(onSuccess).catch(onFetchError(onError));
        }
        return future;
    }
};

export default Fetch;
