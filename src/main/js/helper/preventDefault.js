/**
 * Trigger different styles to prevent the event from bubble up
 * @param event you want to intercept
 */
export function preventDefault(event) {
    if (event && event.preventDefault instanceof Function) {
        event.preventDefault();
    }
    if (event && event.stopPropagation instanceof Function) {
        event.stopPropagation();
    }
    if (event && event.nativeEvent && event.nativeEvent.stopImmediatePropagation instanceof Function) {
        event.nativeEvent.stopImmediatePropagation();
    }
}
