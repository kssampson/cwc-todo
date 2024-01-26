import { List } from "src/list/list.entity";
export declare class User {
    id: number;
    lists: List[];
    name: string;
    email: string;
    password: string;
    signedIn: boolean;
}
