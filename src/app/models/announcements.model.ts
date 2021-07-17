import { NumberValueAccessor } from "@angular/forms";

export class Announcement{
    _id:number=-1;
    title:string="";
    category:string="";
    description: string="";
    createdByName: string="";
    createdById: string="";
    createdOn: Date;
    isReadMore: boolean=false;
}