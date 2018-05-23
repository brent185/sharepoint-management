export class SiteUser {
    Url: string;
    ID: number;
    Status: number
    NominatedByLoginName: string;
    NominatedByDisplayName: string;
    NominatedDate: Date;
    ConfirmedByLoginName: string;
    ConfirmedByDisplayName: string;
    ConfirmedDate: Date;
    SiteID: number;
    User: User;
    Role: Role;
    constructor(){
        this.User = new User();
        this.Role = new Role();
    }

}

export class User {
    LoginName: string;
    EID: string;
    EmailAddress: string;
    DisplayName: string;
    FirstName: string;
    LastName: string;
    IsPrimarAccount: boolean;
    SearchName: string;
    JobTitle: string;
    DivisionDescription: string;
}

export class Role {
    ID: number;
    Name: string;
}