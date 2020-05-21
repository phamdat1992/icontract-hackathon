import { fetchUrl } from '../utils/http';
import { BASE_API, DOMAIN_URL } from '../constants/api';

export const fetchWithPath = (path, params = {}, refresh = false) => {
    const API = BASE_API + path;
    const options = { ...params };
    const url = buildURLWithParam(API, options);
    return new Promise(resolve => {
        fetchWithUrl(url).then(response => {
            resolve(response);
        }).catch(() => {
            resolve();
        });
    });
};

export const fetchWithUrl = (url, params = {}, options = {}, timeOut) => {
    return fetch(url, params, options, timeOut);
};

export const fetch = (url, params = {}, options = {}, timeOut) => {
    return fetchUrl(buildURLWithParam(url, params), options, timeOut)
        .then(resp => resp.json())
        .catch(error => ({ error }));
};

export const isValidEmail = (email) => {
    if (!email) return false;
    if (email.trim().search(' ') >= 0) {
        return false;
    }

    const reg_email = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/i;
    return reg_email.test(email);
};

export const buildParamsQuery = (object) => {
    let items = Object.keys(object).map(function (key) {
        if (object[key] !== 'undefined' && object[key] !== 'null' && object[key] !== undefined && object[key] !== null && object[key] !== '') {
            return `${key}=${encodeURIComponent(object[key])}`;
        }

        return undefined;
    });

    let result = items.filter(t => t !== undefined).join('&');
    return result;
};

export const buildURLWithParam = (url, params) => {
    if (isEmpty(params)) {
        return url;
    }

    const query = buildParamsQuery(params);
    return url + (isEmpty(query) ? '' : '?' + query);
};

export function getQueryStringParams() {
    let query = window.location.search;
    if (query) {
        if (/^[?#]/.test(query)) {
            query = query.slice(1);
        }

        return query.split('&')
            .reduce((params, param) => {
                let [key, value] = param.split('=');
                params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                return params;
            }, {});
    }

    return {};
}

const getConstructor = input => (input !== null && typeof input !== 'undefined' ? input.constructor : null);
const instanceOf = (input, constructor) => Boolean(input && constructor && input instanceof constructor);
const isNullOrUndefined = input => input === null || typeof input === 'undefined';
const isObject = input => getConstructor(input) === Object;
const isString = input => getConstructor(input) === String;
const isArray = input => Array.isArray(input);
const isNodeList = input => instanceOf(input, NodeList);

const isEmpty = input =>
    isNullOrUndefined(input) ||
    ((isString(input) || isArray(input) || isNodeList(input)) && !input.length) ||
    (isObject(input) && !Object.keys(input).length);

export const isUrl = input => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(input);
};