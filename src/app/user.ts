import { SiteUserStatus } from './enums';

export class AttestationUser {
    Url: string;
    ID: number;
    Status: SiteUserStatus = SiteUserStatus.NotSelected;
    NominatedByLoginName: string;
    NominatedByDisplayName: string;
    NominatedDate: Date;
    ConfirmedByLoginName: string;
    ConfirmedByDisplayName: string;
    ConfirmedDate: Date;
    UserIsInvalid: boolean;
    SiteID?: number;
    User: User;
    Role: number;
    SPSiteCollectionID: number;
    SiteCollectionSPID: number;
    constructor(){
        this.User = new User();
       // this.Role = new Role();
    }
}

export class User {
    LoginName: string;
    EID?: string;
    EmailAddress?: string;
    DisplayName?: string;
    FirstName?: string;
    LastName?: string;
    IsPrimarAccount?: boolean;
    SearchName?: string;
    JobTitle?: string;
    DivisionDescription?: string;
    IsAdmin: boolean;
}

export class Role {
    ID: number;
    Name: string;
}

