export type XObject = {
    [key : string] : any
}

export type DbField<T> = {
    [field in keyof T]? : any;
}

export enum UserPlatformSource {WX = 1, ALI = 2}