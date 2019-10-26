export interface RoutePath {
    id?: number | null;
    isActive: number | boolean;
    name: string;
    fatherID: number | null | String;
    level: string;
    url: string;
    icon: string;
    parent?:parent,
    children?: RoutePath[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface parent {
    id: any
}
