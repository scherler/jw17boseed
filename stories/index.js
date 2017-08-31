const ext = require('@jenkins-cd/js-extensions');
ext.store.init({
    extensionData: [],
    typeInfoProvider: (type, cb) => {
        cb(null);
    },
});

require('./hello.sp');
require('./slider.sp');
require('./presentation');
require('./presentation2');
