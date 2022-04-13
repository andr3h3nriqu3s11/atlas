import {CreateUserRequestBody, LoginUserRequest, UpdatePasswordUserRequestBody, UpdateUserRequestBody, UserLoginResponseType, UserResponseType} from '@/types/user';
import { CreateTemplateRequestBody, TemplateReturn, UpdateTemplateRequestBody } from '~/types';
import { CreateWorldSettingRequest, WorldSetting } from '~/types/setting';

class RequestsClass {

    req: Requester


    objToUrl = (url: string, data: any) => {
        let urlD = new URL(url);

        for (let key in Object.keys(data)) {
            let tt = data[key];
            if (key && tt != undefined && tt != null)
                urlD.searchParams.append(key, String(tt));
        }

        return urlD.toString();
    }

    constructor (req: Requester) {
        this.req = req;
    }

    user = {
        create: (data: CreateUserRequestBody): Promise<UserResponseType> => this.req.post('/user/create', {data}),

        login: (data: LoginUserRequest): Promise<UserLoginResponseType> => this.req.post('/user/login', {data}),

        list: (): Promise<UserResponseType[]> => this.req.get('/users'),

        authorized: (id: string): Promise<UserResponseType> => this.req.get(`/user/auth/${id}`),

        update: (data: UpdateUserRequestBody): Promise<UserResponseType> => this.req.put(`/user`, {data}),

        updatePass: (data: UpdatePasswordUserRequestBody): Promise<UserResponseType> => this.req.put(`/user/pass`, {data})
    }

    setting = {
        create: (data: CreateWorldSettingRequest): Promise<WorldSetting> => this.req.post(`/setting`, {data}),

        get: (id: string): Promise<WorldSetting> => this.req.get(this.objToUrl('/setting', {id})),

        update: (id: string, data: CreateWorldSettingRequest): Promise<WorldSetting> => this.req.put(`/setting/${id}`, {data}),

        delete: (id: string): Promise<WorldSetting> => this.req.delete(`/setting/${id}`)
    }

    template = {

        create: (data: CreateTemplateRequestBody): Promise<TemplateReturn> => this.req.post(`/template`, {data}),

        update: (id: string, data: UpdateTemplateRequestBody): Promise<TemplateReturn> => this.req.put(`/template/${id}`, {data}),

        get: (options?:{
            id?: string;
            includeFields?: boolean; 
        }) => this.req.get(this.objToUrl('/template', options)),

        delete: (id: string): Promise<TemplateReturn> => this.req.delete(`/template/${id}`)
    }


}

interface Requester {
    post: (url: string, options?: {data?: any, token?: string}) => Promise<any>
    get: (url: string, options?: {data?: any, token?: string}) => Promise<any>
    put: (url: string, options?: {data?: any, token?: string}) => Promise<any>
    delete: (url: string, options?: {data?: any, token?: string}) => Promise<any> 
}

class OurAxios {

    //axios: Axios

    baseUrl: string

    constructor (baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    getToken = () => localStorage.getItem('LoginToken') ?? undefined;

    buildHeaders = (json?: boolean, token?: string) => ({
        ...(json ? {'content-type': 'application/json;',} : {}),
        ...(token ? {'token': token,} : {})
    })

    async post (url: string, options?: {data?: any, token?: string}) {
        let {data, token = this.getToken()} = options ?? {};

        let u = new URL(url, this.baseUrl)

        let r = await fetch(u.toString(), {
            method: 'POST',
            headers: this.buildHeaders(data, token),
            ...(data ? {body: JSON.stringify(data)} : {})
        });

        return r.json();
    }

    async get (url: string, options?: {data?: any, token?: string}) {
        let {data, token = this.getToken()} = options ?? {};

        let u = new URL(url, this.baseUrl)

        let r = await fetch(u.toString(), {
            method: 'GET',
            headers: this.buildHeaders(data, token),
            ...(data ? {body: JSON.stringify(data)} : {})
        })

        return r.json();
    }

    async put (url: string, options?: {data?: any, token?: string}) {
        let {data, token = this.getToken()} = options ?? {};

        let u = new URL(url, this.baseUrl)
        
        let r = await fetch(u.toString(), {
            method: 'PUT',
            headers: this.buildHeaders(data, token),
            ...(data ? {body: JSON.stringify(data)} : {})
        })

        return r.json();
    }

    delete (url: string, options?: {data?: any, token?: string}) {
        let {data, token = this.getToken()} = options ?? {};

        let u = new URL(url, this.baseUrl)
        
        return fetch(u.toString(), {
            method: 'DELETE',
            headers: this.buildHeaders(data, token),
            ...(data ? {body: JSON.stringify(data)} : {})
        })
    }
}

const Requests = new RequestsClass(new OurAxios('http://localhost:3001'));

export default Requests;