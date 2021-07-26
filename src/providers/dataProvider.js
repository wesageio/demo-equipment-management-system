import { fetchUtils, HttpError } from 'react-admin';
import { stringify } from 'query-string'; 
import Axios from 'axios';
import { convertFileToBase64, getUpdatedData } from '../utils/utils';

const apiUrl = window.env ? window.env.REACT_APP_ADMIN_API : process.env.REACT_APP_ADMIN_API;
const httpClient = fetchUtils.fetchJson;

const prepareUpdateBody = async (body) => {
    if (body.attachments && body.attachments.length !== 0) {
        body.attachments = body.attachments.filter((element) => {
            return element !== undefined && element.path !== null;
        });
        const newAttachments = body.attachments.filter((item) => {
            return item.path
        })
        const oldAttachments = body.attachments.filter((item) => {
            delete item.s3PresignedUrl;
            return !item.path
        })
        const formatedAttachments = await convertFileToBase64(newAttachments);
        const newData = Object.assign({}, body, { attachments: oldAttachments.concat(formatedAttachments)
        });
        if (formatedAttachments) {
            return newData;
        }
    }
    return body;
}

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = `filter=${encodeURIComponent(JSON.stringify(params.filter))}&limit=${perPage}&page=${page}&orderBy=${field}&orderDir=${order}`;
        const url = `${apiUrl}/${resource}?${query}`;
        return Axios.get(url).then((res) => ({
            data: res.data.length !== 0 ? res.data.data.map(record => ({ id: record._id, ...record })) : [],
            total: parseInt(res.data.count),
        }));
    },

    getOne: (resource, params) => {
        if (params.id) {
            return Axios.get(`${apiUrl}/${resource}/${params.id}`).then((res) => ({
                data: { id: res.data._id, ...res.data }
            }));
        }
    },

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({
            data: json ? json.data.map(resource => ({ ...resource, id: resource._id }) ) : [],
        }));
    },

    getManyReference: (resource) => {
        // const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        // const query = {
        //     sort: JSON.stringify([field, order]),
        //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        //     filter: JSON.stringify({
        //         ...params.filter,
        //         [params.target]: params.id,
        //     }),
        // };
        const url = `${apiUrl}/${resource}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: async (resource, params) => {
        let body = getUpdatedData(params.previousData, params.data);
        if (resource === 'settings') {
            if (!body.hasOwnProperty('pass')) {
                const settingsData = JSON.parse(localStorage.getItem('settings')) || {};
                Object.keys(body).map((item) => {
                    settingsData[item] = body[item]
                })
                localStorage.setItem('settings', JSON.stringify(settingsData));
            }
            const userId = localStorage.getItem('username');
            body.userId = userId;
        }
        const resultData = await prepareUpdateBody(body);
        return new Promise((resolve, reject) => {
            httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(resultData),
            }).then(({ json }) => resolve({ data: { id: json._id, ...json } })).catch((err) => {return reject(
                new HttpError(
                    (err && err.message),
                    err.statusCode,
                    err
                ))})
        })
    },

    updateMany: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'PUT',
            body: JSON.stringify(params),
        }).then(({ json }) => ({ data: json })).catch((err) => {
            console.log(err)
        });
    },

    create: async (resource, params) => {
        let body = params.data;
        if (body.attachments && body.attachments.length !== 0) {
            const formatedAttachments = await convertFileToBase64(body.attachments)
            const newData = Object.assign({}, body, { attachments: formatedAttachments });
            return Axios.post(`${apiUrl}/${resource}`, newData,).then(({ data }) => ({
                data: { ...newData, id: data.data._id },
            })).catch((err) => {
                console.log(err);
            });
        } else {
            return Axios.post(`${apiUrl}/${resource}`,body).then(({ data }) => ({
                data: { ...body, id: data.data._id },
            })).catch((err) => {
                console.log(err);
            });
        }
    },

    delete: (resource, params) => {
        return Axios.delete(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(() => ({ data: params.previousData }));
    },

    deleteMany: (resource, params) => {
        const deletedIds = {
            ids: params.ids,
        };
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'DELETE',
            body: JSON.stringify(deletedIds),
        }).then(({ json }) => ({ data: [json] }));
    }
};