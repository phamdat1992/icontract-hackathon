export function fetchUrl() {
    const args = [...arguments];

    if (window.fetch) {
        return window.fetch.apply(window, args);
    }

    function normalizeName(name) {
        if (typeof name !== 'string') {
            name = name.toString();
        }
        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) { // eslint-disable-line
            throw new TypeError('Invalid character in header field name');
        }
        return name.toLowerCase();
    }

    function normalizeValue(value) {
        if (typeof value !== 'string') {
            value = value.toString();
        }
        return value;
    }

    function Headers(headers) {
        this.map = {};

        if (headers instanceof Headers) {
            headers.forEach((name, values) => {
                values.forEach((value) => {
                    this.append(name, value);
                });
            });
        } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach((name) => {
                this.append(name, headers[name]);
            });
        }
    }

    Headers.prototype.append = function (name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        let list = this.map[name];
        if (!list) {
            list = [];
            this.map[name] = list;
        }
        list.push(value);
    };

    Headers.prototype['delete'] = function (name) {
        delete this.map[normalizeName(name)];
    };

    Headers.prototype.get = function (name) {
        const values = this.map[normalizeName(name)];
        return values ? values[0] : null;
    };

    Headers.prototype.getAll = function (name) {
        return this.map[normalizeName(name)] || [];
    };

    Headers.prototype.has = function (name) {
        return this.map.hasOwnProperty(normalizeName(name));
    };

    Headers.prototype.set = function (name, value) {
        this.map[normalizeName(name)] = [normalizeValue(value)];
    };

    // Instead of iterable for now.
    Headers.prototype.forEach = function (callback) {
        Object.getOwnPropertyNames(this.map).forEach((name) => {
            callback(name, this.map[name]);
        });
    };

    function consumed(body) {
        if (body.bodyUsed) {
            return fetch.Promise.reject(new TypeError('Already read'));
        }
        body.bodyUsed = true;
    }

    function fileReaderReady(reader) {
        return new fetch.Promise(function (resolve, reject) {
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function () {
                reject(reader.error);
            };
        });
    }

    function readBlobAsArrayBuffer(blob) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        return fileReaderReady(reader);
    }

    function readBlobAsText(blob) {
        const reader = new FileReader();
        reader.readAsText(blob);
        return fileReaderReady(reader);
    }

    const support = {
        blob: 'FileReader' in window && 'Blob' in window && (function () {
            try {
                new Blob();
                return true;
            } catch (e) {
                return false;
            }
        })(),
        formData: 'FormData' in window
    };

    function Body() {
        this.bodyUsed = false;

        this._initBody = function (body) {
            this._bodyInit = body;
            if (typeof body === 'string') {
                this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                this._bodyFormData = body;
            } else if (!body) {
                this._bodyText = '';
            } else {
                throw new Error('unsupported BodyInit type');
            }
        };

        if (support.blob) {
            this.blob = function () {
                const rejected = consumed(this);
                if (rejected) {
                    return rejected;
                }

                if (this._bodyBlob) {
                    return fetch.Promise.resolve(this._bodyBlob);
                } else if (this._bodyFormData) {
                    throw new Error('could not read FormData body as blob');
                } else {
                    return fetch.Promise.resolve(new Blob([this._bodyText]));
                }
            };

            this.arrayBuffer = function () {
                return this.blob().then(readBlobAsArrayBuffer);
            };

            this.text = function () {
                const rejected = consumed(this);
                if (rejected) {
                    return rejected;
                }

                if (this._bodyBlob) {
                    return readBlobAsText(this._bodyBlob);
                } else if (this._bodyFormData) {
                    throw new Error('could not read FormData body as text');
                } else {
                    return fetch.Promise.resolve(this._bodyText);
                }
            };
        } else {
            this.text = function () {
                const rejected = consumed(this);
                return rejected ? rejected : fetch.Promise.resolve(this._bodyText);
            };
        }

        if (support.formData) {
            this.formData = function () {
                return this.text().then(decode);
            };
        }

        this.json = function () {
            return this.text().then(function (text) {
                return JSON.parse(text);
            });
        };

        return this;
    }

    // HTTP methods whose capitalization should be normalized
    const methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    function normalizeMethod(method) {
        const upcased = method.toUpperCase();
        return (methods.indexOf(upcased) > -1) ? upcased : method;
    }

    function Request(url, options) {
        options = options || {};
        this.url = url;

        this.credentials = options.credentials || 'omit';
        this.headers = new Headers(options.headers);
        this.method = normalizeMethod(options.method || 'GET');
        this.mode = options.mode || null;
        this.referrer = null;

        if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
            throw new TypeError('Body not allowed for GET or HEAD requests');
        }
        this._initBody(options.body);
    }

    function decode(body) {
        const form = new FormData();
        body.trim().split('&').forEach(function (bytes) {
            if (bytes) {
                const split = bytes.split('=');
                const name = split.shift().replace(/\+/g, ' ');
                const value = split.join('=').replace(/\+/g, ' ');
                form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
        });
        return form;
    }

    function headers(xhr) {
        const head = new Headers();
        const pairs = xhr.getAllResponseHeaders().trim().split('\n');
        pairs.forEach(function (header) {
            const split = header.trim().split(':');
            const key = split.shift().trim();
            const value = split.join(':').trim();
            head.append(key, value);
        });
        return head;
    }

    const noXhrPatch =
        typeof window !== 'undefined' && !!window.ActiveXObject &&
        !(window.XMLHttpRequest && (new XMLHttpRequest()).dispatchEvent);

    function getXhr() {
        // from backbone.js 1.1.2
        // https://github.com/jashkenas/backbone/blob/1.1.2/backbone.js#L1181
        if (noXhrPatch && !(/^(get|post|head|put|delete|options)$/i.test(this.method))) {
            this.usingActiveXhr = true;
            return new window.ActiveXObject('Microsoft.XMLHTTP');
        }
        return new XMLHttpRequest();
    }

    Body.call(Request.prototype);

    function Response(bodyInit, options) {
        if (!options) {
            options = {};
        }

        this._initBody(bodyInit);
        this.type = 'default';
        this.url = null;
        this.status = options.status;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = options.statusText;
        this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
        this.url = options.url || '';
    }

    Body.call(Response.prototype);

    window.Headers = Headers;
    window.Request = Request;
    window.Response = Response;

    window.fetch = function (input, init) {
        // TODO: Request constructor should accept input, init
        let request;
        if (Request.prototype.isPrototypeOf(input) && !init) {
            request = input;
        } else {
            request = new Request(input, init);
        }

        return new fetch.Promise(function (resolve, reject) {
            const xhr = getXhr.call(this);
            if (request.credentials === 'cors') {
                xhr.withCredentials = true;
            }

            function responseURL() {
                if ('responseURL' in xhr) {
                    return xhr.responseURL;
                }

                // Avoid security warnings on getResponseHeader when not allowed by CORS
                if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
                    return xhr.getResponseHeader('X-Request-URL');
                }

                return;
            }

            function onload() {
                if (xhr.readyState !== 4) {
                    return;
                }
                const status = (xhr.status === 1223) ? 204 : xhr.status;
                if (status < 100 || status > 599) {
                    reject(new TypeError('Network request failed'));
                    return;
                }
                const options = {
                    status: status,
                    statusText: xhr.statusText,
                    headers: headers(xhr),
                    url: responseURL()
                };
                const body = 'response' in xhr ? xhr.response : xhr.responseText;
                resolve(new Response(body, options));
            }
            xhr.onreadystatechange = onload;
            if (!this.usingActiveXhr) {
                xhr.onload = onload;
                xhr.onerror = function () {
                    reject(new TypeError('Network request failed'));
                };
            }

            xhr.open(request.method, request.url, true);

            if ('responseType' in xhr && support.blob) {
                xhr.responseType = 'blob';
            }

            request.headers.forEach(function (name, values) {
                values.forEach(function (value) {
                    xhr.setRequestHeader(name, value);
                });
            });

            xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
        });
    };

    fetch.Promise = window.Promise; // you could change it to your favorite alternative
    window.fetch.polyfill = true;

    return window.fetch.apply(window, args);
}
