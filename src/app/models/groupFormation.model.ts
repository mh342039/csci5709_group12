export class GroupFormation {
    public _id: number = -1;
    public groupName: string = "";
    public location: string= "";
    public faculty: string = "";
    public mentee : any[] = [];
}

export class Mentee {
    public _id: number = -1;
    public name: string = "";
    public program: string= "";
    public checked: boolean ;
}