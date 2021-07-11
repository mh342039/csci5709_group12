export class MemberProfileModel {
  _id: number = -1;
  name: string;
  email: string;
  faculty: string;
  program: string;
  programStartDate: string;
  programEndDate: string;
  role: string;
  requestType: string; //change req/ remove member/ deactivate acc
  requestDate: string;
  requestStatus: string; //role changed/removed/deactivated
  /*accessModificationType: string;
  accessModificationDate: string;
  accessStatus: string; //removed or deactivated*/
  modificationDate: string;
  mode: string; //V - View; C - Create
}
