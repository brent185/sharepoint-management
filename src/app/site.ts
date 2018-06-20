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
    Hierarchy: Web[];
    FlatSites: Web[];
    AttestationUsers: AttestationUser[];
}
