import { fetchUtils, HttpError } from 'react-admin';
import Axios from 'axios';
import { convertFileToBase64 } from '../utils/utils';

const apiUrl = window.env ? window.env.REACT_APP_ADMIN_API : process.env.REACT_APP_ADMIN_API;
const httpClient = fetchUtils.fetchJson;

const getToken = () => {
    const JWTToken = localStorage.getItem('token');
    return {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${JWTToken}`,
        }
    }
}

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
        const newData = Object.assign({}, body, {
            attachments: oldAttachments.concat(formatedAttachments)
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
        return Axios.get(url, getToken()).then((res) => ({
            data: res.data.length !== 0 ? res.data.data.map(record => ({ id: record._id, ...record })) : [],
            total: parseInt(res.data.count),
        }));
    },

    getOne: (resource, params) => {
        if (params.id) {
            return Axios.get(`${apiUrl}/${resource}/${params.id}`, getToken()).then((res) => ({
                data: { id: res.data._id, ...res.data }
            }));
        }
    },

    getMany: (resource, params) => {
        const query = `filter=${encodeURIComponent(JSON.stringify(params))}&limit=25&page=1&orderBy=id&orderDir=DESC`;
        const url = `${apiUrl}/${resource}?${query}`;
        return Axios.get(url, getToken()).then(({ data }) => ({
            data: data ? data.data : []
        }));
    },

    getManyReference: (resource) => {
        const url = `${apiUrl}/${resource}`;
        return Axios.get(url, { headers: getToken().headers }).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: async (resource, params) => {
        let body = params.data;
        if (resource === 'settings') {
            if (!body.hasOwnProperty('pass')) {
                const settingsData = JSON.parse(localStorage.getItem('settings')) || {};
                Object.keys(body).map((item) => {
                    settingsData[item] = body[item]
                })
                localStorage.setItem('settings', JSON.stringify(settingsData));
            }
        }
        const resultData = await prepareUpdateBody(body);
        return Axios.put(`${apiUrl}/${resource}/${params.id}`, resultData, getToken()).then(({ data }) => ({
            data: { id: data._id, ...data },
        })).catch((err) => {
            new HttpError(
                (err && err.message),
                err.statusCode,
                err
            )
        });
    },

    updateMany: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: getToken().headers,
        }).then(({ json }) => ({ data: json })).catch((err) => {
            console.log(err)
        });
    },

    create: async (resource, params) => {
        let body = params.data;
        if (body.attachments && body.attachments.length !== 0) {
            body.attachments = body.attachments.filter(function( element ) {
                return element !== undefined;
            });
            const formatedAttachments = await convertFileToBase64(body.attachments)
            const newData = Object.assign({}, body, { attachments: formatedAttachments });
            return Axios.post(`${apiUrl}/${resource}`, newData, getToken()).then(({ data }) => ({
                data: { ...newData, id: data.data._id },
            })).catch((err) => {
                console.log(err);
            });
        } else {
            return Axios.post(`${apiUrl}/${resource}`, body, getToken()).then(({ data }) => ({
                data: { ...body, id: data.data._id },
            })).catch((err) => {
                console.log(err);
            });
        }
    },

    delete: (resource, params) => {
        return Axios.delete(`${apiUrl}/${resource}/${params.id}`, getToken()).then(() => ({ data: params.previousData }));
    },

    deleteMany: (resource, params) => {
        const deletedIds = {
            ids: params.ids,
        };
        const token = getToken().headers
        // return Axios.delete(`${apiUrl}/${resource}`, deletedIds, getToken()).then(({ json }) => ({ data: [json] })).catch((err) => {
        //     console.log(err);
        // });
        return Axios.delete(`${apiUrl}/${resource}`, {
            headers: token,
            data: {
                ids: deletedIds.ids
            }
        }).then(({ json }) => ({ data: [json] })).catch((err) => {
            console.log(err);
        });
        // return httpClient(`${apiUrl}/${resource}`, {
        //     method: 'DELETE',
        //     headers: getToken().headers,
        //     body: JSON.stringify(deletedIds)
        // }, getToken()).then(({ json }) => ({ data: [json] }));
    }
};