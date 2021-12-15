class Api {
    baseUrl: string;

    utils: {
        ping: () => void;
    };

    commands: {
        data: () => any;
        error: () => any;
        loading: () => any;
    };

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;

        this.commands = {
            data: async () => (await this.get('/data')).json(),
            error: async () => (await this.get('/error')).statusText,
            loading: async () => (await this.get('/loading')).statusText,
        };
        this.utils = {
            ping: () => this.get('/ping'),
        };
    }

    async api(url: string, settings: RequestInit) {
        const response = await fetch(this.baseUrl + url, settings);

        if (!response.ok) {
            throw new Error(`Api error ${response.statusText}`);
        }

        return response;
    }

    async post(url: string, postData: any) {
        return this.api(url, {
            method: 'POST',
            body: postData,
        });
    }

    async delete(url: string) {
        return this.api(url, {
            method: 'DELETE',
        });
    }

    async postJson(url: string, postData: any) {
        return this.api(url, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
        });
    }

    async get(url: string) {
        return this.api(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });
    }
}

const api = new Api('http://localhost:7070');
export default api;
