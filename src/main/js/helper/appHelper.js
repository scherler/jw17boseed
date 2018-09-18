// allows us to inject setBlueOceanConfig into windows and set the BO object
class AppHelper {
    constructor() {
    // using script loader to enable callback when loading has finished
        window.javaScriptLoader = (src, callback) => {
            const script = document.createElement('script');
            let loaded;
            script.setAttribute('src', src);
            if (callback) {
                script.onreadystatechange = script.onload = function onload() {
                    if (!loaded) {
                        callback();
                    }
                    loaded = true;
                };
            }
            document.getElementsByTagName('body')[0].appendChild(script);
        };
    }
}
// by creating an instance we inject the function
const appHelper = new AppHelper();
export default appHelper;
