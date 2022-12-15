var MemoryStorage = require('memorystorage');
// here, the MemoryStorage function is available
var myStorage = new MemoryStorage('note-app');


exports.getkeys = (myStorage) => {
    const keys = [];
    for (var i = 0; i < myStorage.length; i++) {
        var key = myStorage.key(i);
        keys.push(key);
    }
    return keys;
};

exports.getvalues = (myStorage) => {
    const values = [];
    for (var i = 0; i < myStorage.length; i++) {
        var key = myStorage.key(i);
        var value = myStorage.getItem(key);
        values.push(value);
    }
    return values;
};



exports.myStorage = myStorage;