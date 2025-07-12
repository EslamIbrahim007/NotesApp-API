import MemoryStorage from 'memorystorage';

const myStorage = new MemoryStorage('note-app');

export const getkeys = (myStorage) => {
    const keys = [];
    for (var i = 0; i < myStorage.length; i++) {
        var key = myStorage.key(i);
        keys.push(key);
    }
    return keys;
};

export const getvalues = (myStorage) => {
    const values = [];
    for (var i = 0; i < myStorage.length; i++) {
        var key = myStorage.key(i);
        var value = myStorage.getItem(key);
        values.push(value);
    }
    return values;
};

export { myStorage };