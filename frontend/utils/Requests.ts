import {CreateUserRequestBody, LoginUserRequest, UpdatePasswordUserRequestBody, UpdateUserRequestBody, UserLoginResponseType, UserResponseType} from '@/types/user';
// import { CreateTemplateFieldRequestBody, CreateTemplateRequestBody, TemplateFieldResponse, TemplateFieldsReturn, TemplateReturn, UpdateTemplateFieldRequestBody, UpdateTemplateRequestBody, CreateWorldSettingRequest, WorldSetting, CreateCampaign, CampaignType, Campaign, create_character, Character } from '~/types';
import { CreateCampaign, CampaignType, Campaign, CreateCharacter, Character, UpdateCharacter, AddSkillCharacter, Skill, SkillCharacterPair, AddEdgeCharacter, Edge, EdgeCharacterPair } from '~/types';

interface Requester {
    post: (url: string, options?: {data?: any, token?: string}) => Promise<any>
    get: (url: string, options?: {data?: any, token?: string}) => Promise<any>
    put: (url: string, options?: {data?: any, token?: string}) => Promise<any>
    delete: (url: string, options?: {data?: any, token?: string}) => Promise<any>
}

class RequestsClass {

    req: Requester

    objToUrl = (url: string, data: any) => {
        const urlD = new URL(url);

        for (const key in Object.keys(data)) {
            const value = data[key];
            if (key && value !== undefined && value !== null)
                urlD.searchParams.append(key, String(value));
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

    campaign = {
      url: '/campaing',

      add: <Type extends CampaignType>(data: CreateCampaign<Type>): Promise<Campaign<Type>> =>
        this.req.post(`${this.campaign.url}/add`, {data}),

      characters: {
        url: `/campaing/characters`,

        add: <Type extends CampaignType>(campaign: Campaign<Type>, name: string): Promise<Character<Campaign<Type>>> =>
          this.req.post(`${this.campaign.characters.url}/add`, {
            data: {
              name,
              campaign_id: campaign.id,
            } as CreateCharacter,
          }),

        update: <Type extends CampaignType>(data: UpdateCharacter<Campaign<Type>>): Promise<Character<Campaign<Type>>> =>
          this.req.post(`${this.campaign.characters.url}/update`, { data }),

        skill: {
          url: `/campaing/characters/skill`,

          add: <Type extends CampaignType>(
            campaign: Campaign<Type>,
            character: Character<Campaign<Type>>,
            skill: Skill<Campaign<Type>>,
            level: number,
          ): Promise<Character<Campaign<Type>>> =>
            this.req.post(`${this.campaign.characters.skill}/add`, {
              data: {
                campaign_id: campaign.id,
                skill_id: skill.id,
                character_id: character.id,
                level,
              } as AddSkillCharacter
            }),

          remove: <Type extends CampaignType>(
            campaign: Campaign<Type>,
            character: Character<Campaign<Type>>,
            skill: Skill<Campaign<Type>>
          ) =>
            this.req.post(`${this.campaign.characters.skill}/remove`, {
              data: {
                campaign_id: campaign.id,
                character_id: character.id,
                skill_id: skill.id,
              } as SkillCharacterPair
            }),
        },

        edge: {
          url: `/campaing/characters/edge`,

          add: (
            campaign: Campaign<CampaignType.SWADE>,
            character: Character<Campaign<CampaignType.SWADE>>,
            edge: Edge,
            level: number,
          ): Promise<Character<Campaign<CampaignType.SWADE>>> =>
            this.req.post(`${this.campaign.characters.edge.url}/add`, {
              data: {
                campaign_id: campaign.id,
                character_id: character.id,
                edge_id: edge.id,
                level,
              } as AddEdgeCharacter
            }),

          remove: (
            campaign: Campaign<CampaignType.SWADE>,
            character: Character<Campaign<CampaignType.SWADE>>,
            edge: Edge,
          ): Promise<Character<Campaign<CampaignType.SWADE>>> =>
            this.req.post(`${this.campaign.characters.edge.url}/remove`, {
              data: {
                character_id: character.id,
                edge_id: edge.id,
                campaign_id: campaign.id,
              } as EdgeCharacterPair,
            }),
        },
      },
    }

    /*
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

        delete: (id: string): Promise<TemplateReturn> => this.req.delete(`/template/${id}`),

        field: {

            create: (data: CreateTemplateFieldRequestBody): Promise<TemplateFieldResponse> => this.req.post(`/template/field/`, {data}),

            update: (data: UpdateTemplateFieldRequestBody, id: string): Promise<TemplateFieldResponse> => this.req.post(`/template/field/${id}`, {data}),

            delete: (id: string): Promise<{}> => this.req.post(`/template/field/${id}`, {}),

        }

    }
    */
}

class OurAxios {

    // axios: Axios

    baseUrl: string
    token?: string

    constructor (baseUrl: string, token?: string) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    getToken = () => localStorage.getItem('LoginToken') ?? undefined;

    buildHeaders = (json?: boolean, token?: string) => ({
        ...(json ? {'content-type': 'application/json;',} : {}),
        ...(token ? {token,} : {})
    })

    async post (url: string, options?: {data?: any, token?: string}) {
        const {data, token = this.getToken() ?? this.token} = options ?? {};

        const urlObj = new URL(url, this.baseUrl)

        const request = await fetch(urlObj.toString(), {
            method: 'POST',
            headers: this.buildHeaders(data, token),
            ...(data ? {body: JSON.stringify(data)} : {})
        });

        return request.json();
    }

    async get (url: string, options?: {data?: any, token?: string}) {
        const {data, token = this.getToken() ?? this.token} = options ?? {};

        const urlObj = new URL(url, this.baseUrl)

        const request = await fetch(urlObj.toString(), {
            method: 'GET',
            headers: this.buildHeaders(data, token),
            ...(data ? {body: JSON.stringify(data)} : {})
        })

        return request.json();
    }

    async put (url: string, options?: {data?: any, token?: string}) {
        const {data, token = this.getToken() ?? this.token} = options ?? {};

        const urlObj = new URL(url, this.baseUrl)

        const request = await fetch(urlObj.toString(), {
            method: 'PUT',
            headers: this.buildHeaders(data, token),
            ...(data ? {body: JSON.stringify(data)} : {})
        })

        return request.json();
    }

    delete (url: string, options?: {data?: any, token?: string}) {
        const {data, token = this.getToken() ?? this.token} = options ?? {};

        const urlObj = new URL(url, this.baseUrl)

        return fetch(urlObj.toString(), {
            method: 'DELETE',
            headers: this.buildHeaders(data, token),
            ...(data ? {body: JSON.stringify(data)} : {})
        })
    }
}

// TODO this url needs to be dynamically loaded from electron
const Requests = new RequestsClass(new OurAxios('http://localhost:3001'));

export default Requests;
