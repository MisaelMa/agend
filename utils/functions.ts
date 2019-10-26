export function encode(value: string | number) {
    return window.btoa(<string>value);
}

export function decode(value: string | (string | null)[]) {
    if (typeof value === 'string')
        return window.atob(value);
    return null;
}