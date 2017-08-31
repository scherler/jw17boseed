import KeyCodes from './KeyCodes';
import { preventDefault } from './preventDefault';
/**
 * Trigger a callback on ENTER and arrow right
 * @param event the event you are watching
 * @param callback the callback you want to call on keyCode
 */
export const handleNext = (event, callback) => {
    const { keyCode } = event;
    switch (keyCode) {
    case KeyCodes.ARROW_RIGHT:
    case KeyCodes.ENTER:
        preventDefault(event);
        if (callback && callback instanceof Function) {
            callback();
        }
        break;
    default:
        break;
    }
};
/**
 * Trigger a callback on arrow right
 * @param event the event you are watching
 * @param callback the callback you want to call on keyCode
 */
export const handleNext = (event, callback) => {
    const { keyCode } = event;
    switch (keyCode) {
    case KeyCodes.ARROW_RIGHT:
    case KeyCodes.ENTER:
        preventDefault(event);
        if (callback && callback instanceof Function) {
            callback();
        }
        break;
    default:
        break;
    }
};
