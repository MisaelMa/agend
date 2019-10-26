declare module 'humble-localstorage' {
    export function getItem(key: string): string | null;
    export function setItem(key: string, value: any): void;
    export function removeItem(key: string): void;
    export function clear(): void;
    export function key(key: number| null): any;
    export const length: number;
    export function getObject(key: string): any | null;
    export function setObject(key: string, value: object | any): void;
    export const isPersistent: boolean;

}
