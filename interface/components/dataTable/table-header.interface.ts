import {compareFn} from "vuetify/src/util/helpers";

export interface TableHeader {
    text: string;
    value: string;
    align?: 'start' | 'center' | 'end' | any;
    sortable?: boolean;
    divider?: boolean;
    class?: string | string[];
    width?: string | number;
    filter?: (value: any, search: string | null, item: any) => boolean;
    sort?: compareFn;
}
