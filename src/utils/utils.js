import _ from 'lodash';

export const getUpdatedData = (oldData, newData) => {
    if (oldData) {
        return _.transform(newData, (result, value, key) => {
            if (!_.isEqual(value, oldData[key])) {
                result[key] = (_.isObject(value) && _.isObject(oldData[key])) ? value : value;
            }
        });
    } else {
        return newData
    }
}

export const convertFileToBase64 = file => {
    return Promise.all(file.filter((el) => el.path !== null).map(item => {
        if (item.path.hasOwnProperty('rawFile')) {
            const reader = new FileReader();
            reader.readAsDataURL(item.path.rawFile);
            return new Promise((resolve) => {
                reader.onload = () => {
                    const data = reader.result.split(',')[1];
                    return resolve({
                        type: item.path.rawFile.type,
                        data: data,
                        fileName: item.path.title,
                        insertFile: true
                    })
                };
            })
        }
        return item
    }))
}