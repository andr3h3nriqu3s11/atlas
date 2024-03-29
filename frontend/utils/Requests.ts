import {CreateUserRequestBody, LoginUserRequest, UpdatePasswordUserRequestBody, UpdateUserRequestBody, UserLoginResponseType, UserResponseType} from '@/types/user';
import {
  CreateCampaign,
  CampaignType,
  Campaign,
  CreateCharacter,
  Character,
  UpdateCharacter,
  AddSkillCharacter,
  Skill,
  SkillCharacterPair,
  AddEdgeCharacter,
  Edge,
  EdgeCharacterPair,
  HindranceCharacterPair,
  AddHindranceCharacter,
  Hindrance,
  CreateSkill,
  UpdateSkill,
  CreateSkillRequirement,
  RemoveSkillRequirement,
  CreateEdge,
  UpdateEdge,
  CreateEdgeRequirement,
  RemoveEdgeRequirement,
  ListCampaign,
  ImportCampaign,
  HindranceType,
  CreateCharacterNote,
  ChangeCharacterNote,
  CharacterNote,
  DeleteCharacterNote,
  CharacterInteraction
} from '~/types';

interface Requester {
    post: (url: string, options?: {data?: any, token?: string}) => Promise<any>
    get: (url: string, options?: {data?: any, token?: string}) => Promise<any>
    put: (url: string, options?: {data?: any, token?: string}) => Promise<any>
    delete: (url: string, options?: {data?: any, token?: string}) => Promise<any>
    patch: (url: string, options?: {data?: any, token?: string}) => Promise<any>
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

      list: <Type extends CampaignType>(data: ListCampaign<Type>): Promise<Campaign<Type>> =>
        this.req.post(`${this.campaign.url}/list`, {data}),

      import: (data: ImportCampaign<Campaign<CampaignType>>): Promise<{}> =>
        this.req.post(`${this.campaign.url}/import`, {data}),

      characters: {
        url: `/campaing/characters`,

        add: <Type extends CampaignType>(campaign: Campaign<Type>, name: string): Promise<Character<Campaign<Type>>> =>
          this.req.put(`${this.campaign.characters.url}`, {
            data: {
              name,
              campaign_id: campaign.id,
            } as CreateCharacter,
          }),

        update: <Type extends CampaignType>(data: UpdateCharacter<Campaign<Type>>): Promise<Character<Campaign<Type>>> =>
          this.req.patch(`${this.campaign.characters.url}`, { data }),

        list: <Type extends Campaign<CampaignType>>(campaign: Type): Promise<Character<Type>> =>
          this.req.post(`${this.campaign.characters.url}`, { data: { campaign_id: campaign.id } }),

        skill: {
          url: `/campaing/characters/skill`,

          add: <Type extends CampaignType>(
            campaign: Campaign<Type>,
            character: Character<Campaign<Type>>,
            skill: Skill<Campaign<Type>>,
            level: number,
          ): Promise<Character<Campaign<Type>>> =>
            this.req.put(`${this.campaign.characters.skill}`, {
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
            this.req.delete(`${this.campaign.characters.skill}`, {
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

        hindrance: {
          url: `/campaing/characters/hindrance`,

          add: (
            campaign: Campaign<CampaignType.SWADE>,
            character: Character<Campaign<CampaignType.SWADE>>,
            hindrance: Hindrance,
            level?: HindranceType.Major | HindranceType.Minor,
          ): Promise<void> =>
            this.req.put(`${this.campaign.characters.hindrance.url}`, {data: {
              campaign_id: campaign.id,
              character_id: character.id,
              hindrance_id: hindrance.id,
              level
            } as AddHindranceCharacter}),

          remove: (
            campaign: Campaign<CampaignType.SWADE>,
            character: Character<Campaign<CampaignType.SWADE>>,
            hindrance: Hindrance,
          ) => this.req.delete(`${this.campaign.characters.hindrance.url}`, { data: {
            campaign_id: campaign.id,
            hindrance_id: hindrance.id,
            character_id: character.id,
          } as HindranceCharacterPair })
        },

        notes: {
          url: `/campaing/characters/notes`,

          add: <Type extends Campaign<CampaignType>>(campaign: Type, character: Character<Type>, data: {
            note: string;
            visible?: boolean;
          }): Promise<Character<Type>> =>
            this.req.put(`${this.campaign.characters.notes.url}`, {data: {
              campaign_id: campaign.id,
              character_id: character.id,
              note: data.note,
              visible: data.visible
            } as CreateCharacterNote}),

          update: <Type extends Campaign<CampaignType>>(campaign: Type, note: CharacterNote<Type>, data: {
            visible?: boolean,
            note?: string,
          }): Promise<Character<Type>> =>
            this.req.patch(`${this.campaign.characters.notes.url}/update`, {data: {
              campaign_id: campaign.id,
              id: note.id,
              visible: data.visible,
              note: data.note,
            } as ChangeCharacterNote }),

          remove: <Type extends Campaign<CampaignType>>(campaign: Type, note: CharacterNote<Type>): Promise<Character<Type>> =>
            this.req.delete(`${this.campaign.characters.notes.url}`, {
              data: {
                id: note.id,
                campaign_id: campaign.id,
              } as DeleteCharacterNote,
            }),

          list: <Type extends Campaign<CampaignType>>(campaign: Type, character: Character<Type>): Promise<CharacterNote<Type>> =>
            this.req.post(`${this.campaign.characters.notes.url}/list`, {
              data: {
                campaign_id: campaign.id,
                character_id: character.id,
              } as CharacterInteraction,
            }),
        },


      },

      skills: {
        url: `/campaing/characters/skills`,

        add: (data: CreateSkill): Promise<Skill> =>
          this.req.put(`${this.campaign.skills.url}`, {data}),
        update: (data: UpdateSkill): Promise<Skill> =>
          this.req.patch(`${this.campaign.skills.url}`, {data}),
        list: (type: CampaignType): Promise<Skill[]> =>
          this.req.post(`${this.campaign.skills.url}`, { data: { type, } }),

        requirements: {
          add: (data: CreateSkillRequirement): Promise<Skill> =>
            this.req.put(`${this.campaign.skills.url}/requirement`, {data}),

          remove: (data: RemoveSkillRequirement): Promise<Skill> =>
            this.req.delete(`${this.campaign.skills.url}/requirement`, {data}),
        },
      },

      edges: {
        url: `/campaing/characters/edges`,

        add: (data: CreateEdge): Promise<Edge> =>
          this.req.put(`${this.campaign.edges.url}`, {data}),

        update: (data: UpdateEdge): Promise<Edge> =>
          this.req.patch(`${this.campaign.edges.url}`, {data}),

        delete: (data: {id: string}): Promise<Edge> =>
          this.req.delete(`${this.campaign.edges.url}`, {data}),

        list: (type: CampaignType): Promise<Edge[]> =>
          this.req.post(`${this.campaign.edges.url}`, { data: { type, }, }),

        requirements: {
          add: (data: CreateEdgeRequirement): Promise<Edge> =>
            this.req.put(`${this.campaign.edges.url}/requirement`, {data}),
          remove: (data: RemoveEdgeRequirement): Promise<Edge> =>
            this.req.delete(`${this.campaign.edges.url}/requirement`, {data}),
        }
      },

      hindrance: {
        url: `/campaing/characters/hindrances`,

        add: (data: CreateEdge): Promise<Hindrance> =>
          this.req.put(`${this.campaign.hindrance.url}`, {data}),

        update: (data: UpdateEdge): Promise<Hindrance> =>
          this.req.patch(`${this.campaign.hindrance.url}`, {data}),

        delete: (data: {id: string}): Promise<Hindrance> =>
          this.req.delete(`${this.campaign.hindrance.url}`, {data}),

        list: (type: CampaignType): Promise<Hindrance[]> =>
          this.req.post(`${this.campaign.hindrance.url}`, { data: { type } }),
      }
    }

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
        ...(json ? {'content-type': 'application/json; charset=utf-8',} : {}),
        ...(json ? {'Accept': 'application/json; charset=utf-8',} : {}),
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

    async delete (url: string, options?: {data?: any, token?: string}) {
        const {data, token = this.getToken() ?? this.token} = options ?? {};

        const urlObj = new URL(url, this.baseUrl)

        const request = await fetch(urlObj.toString(), {
            method: 'DELETE',
            headers: this.buildHeaders(data, token),
            ...(data ? {body: JSON.stringify(data)} : {})
        });

        return request.json();
    }

    async patch (url: string, options?: {data?: any, token?: string}) {
        const {data, token = this.getToken() ?? this.token} = options ?? {};

        const urlObj = new URL(url, this.baseUrl)

        const request = await fetch(urlObj.toString(), {
            method: 'PATCH',
            headers: this.buildHeaders(data, token),
            ...(data ? {body: JSON.stringify(data)} : {})
        });

        return request.json();
    }
}

// TODO this url needs to be dynamically loaded from electron
const Requests = new RequestsClass(new OurAxios('http://localhost:3001'));

export default Requests;
