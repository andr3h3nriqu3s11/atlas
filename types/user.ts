
export enum UserType {
    PLEB = 'PLEB',
    DM = 'DM'
}

export interface CreateUserRequestBody {
    name: string,
    password: string,
}

export interface UpdateUserRequestBody {
    name?: string,
    id?: string,
}

export interface UpdatePasswordUserRequestBody {
    oldPassword: string,
    password: string

    //For the new token
    expire?: number
}

export interface UserResponseType {
    id: string,
    name: string,
    password: string,
    userType: UserType,
    authorized: boolean,
}

export interface UserLoginResponseType {
    token: string,
    user: UserResponseType
}

export interface LoginUserRequest {
	name: string;
	// Time in seconds default will be 24 hours
	expire?: number;
	password: string;
}