//import Axios from '@nuxtjs/axios'

import {CreateUserRequestBody, LoginUserRequest, UpdatePasswordUserRequestBody, UpdateUserRequestBody, UserLoginResponseType, UserResponseType} from '@types/user';

class RequestsClass {

    req: Requester

    constructor (req: Requester) {
        this.req = req;
    }

    user = {
        create: (data: CreateUserRequestBody): Promise<UserResponseType> => this.req.post('/user/create', {data}),

        login: (data: LoginUserRequest): Promise<UserLoginResponseType> => this.req.post('/user/login', {data}),

        //TODO: add token
        list: (): Promise<UserResponseType[]> => this.req.get('/users'),

        //TODO: add token
        authorized: (id: string): Promise<UserResponseType> => this.req.get(`/user/auth/${id}`),

        //TODO: add token
        update: (data: UpdateUserRequestBody): Promise<UserResponseType> => this.req.put(`/user`, {data}),

        //TODO: add token
        updatePass: (data: UpdatePasswordUserRequestBody): Promise<UserResponseType> => this.req.put(`/user/pass`, {data})
    }


}

interface Requester {
    post: (url: string, options?: {data?: any, token?: string}) => Promise<any>
    get: (url: string, options?: {data?: any, token?: string}) => Promise<any>
    put: (url: string, options?: {data?: any, token?: string}) => Promise<any>
}

class OurAxios {

    //axios: Axios

    baseUrl: string

    constructor (baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    post (url: string, options?: {data?: any, token?: string}) {
        let {data, token} = options ?? {};

        let u = new URL(url, this.baseUrl)

        return fetch(u.toString(), {
            method: 'POST',
            headers: {
                ...(data ? {'content-type': 'application/json;',} : {}),
                ...(token ? {'token': token,} : {})
            },
            ...(data ? {body: JSON.stringify(data)} : {})
        })
    }

    get (url: string, options?: {data?: any, token?: string}) {
        let {data, token} = options ?? {};

        let u = new URL(url, this.baseUrl)

        return fetch(u.toString(), {
            method: 'GET',
            headers: {
                ...(data ? {'content-type': 'application/json;',} : {}),
                ...(token ? {'token': token,} : {})
            },
            ...(data ? {body: JSON.stringify(data)} : {})
        })
    }

    put (url: string, options?: {data?: any, token?: string}) {
        let {data, token} = options ?? {};

        let u = new URL(url, this.baseUrl)
        
        return fetch(u.toString(), {
            method: 'PUT',
            headers: {
                ...(data ? {'content-type': 'application/json;',} : {}),
                ...(token ? {'token': token,} : {})
            },
            ...(data ? {body: JSON.stringify(data)} : {})
        })
    }
}

const Requests = new RequestsClass(new OurAxios('localhost:3001'));

export default Requests;