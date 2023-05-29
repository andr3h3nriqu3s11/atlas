export const T = {
    string: (): typed_string => ({type: 'string'}),
    enum: (values: string[]): typed_enum => ({type: 'string', enum: values}),
    enumO: (values: Record<string, string>): typed_enum => ({type: 'string', enum: Object.values(values)}),
    object: <Props extends Record<string, typed<types>>>
        (properties: Props, {required = Object.keys(properties), extra = undefined}: {required?: Array<keyof Props>, extra?: boolean} = {}): typed_object => 
            ({type: 'object', properties, required: required as string[], additionalProperties: extra}),
    number: (defaultValue?: number): typed_number => ({type: 'number', default: defaultValue}),
    boolean: (defaultValue?: boolean): typed_boolean => ({type: 'boolean', default: defaultValue}),
};

export type types = 'string' | 'object' | 'number' | 'boolean';

export type typed<Type extends types> = {type: Type};
export type typed_default<Default, Type extends types> = typed<Type> & {default?: Default}

export type typed_string = typed<'string'>
export type typed_number = typed_default<number, 'number'>
export type typed_boolean = typed_default<boolean, 'boolean'>
export type typed_enum = typed<'string'> & {enum: string[]}
export type typed_object = typed<'object'> & { 
    properties: Record<string, typed<types>>, 
    required?: string[],
    additionalProperties?: boolean,
}
