import { AttestationUser } from './user';

export class Site {
    Url: string;
    SubSites: any[];
    SiteID: number;
    PLMSiteID: number;
    SPID: string;
    SPParentID: string;
    InheritOwnerAdmins?: boolean;
    InheritFromSiteId?: number;
}

export class SiteCollection {
    ID: number;
    SPID: string;
    Url: string;
    WebApplication: string;
    ContentDatabase: string;
    PrimaryAdminLoginName: string;
    SecondaryAdminLoginName: string;
   // Webs: Web
}

export class Web {
    ID: number;
    Url: string;
    SubSites: any[];
    SiteID: number;
    PLMSiteID: number;
    SPID: string;
    SPParentID: string;
    InheritOwnerAdmins?: boolean;
    InheritFromSiteId?: number;
}

export class SiteAttestation {
    Site: Site;
    Hierarchy: Web[];
    FlatSites: Web[];
    AttestationUsers: AttestationUser[];
    ActiveWorkflow: any;
}
