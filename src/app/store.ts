// import { User } from './user';
// import { Site } from './site';
// import { LOGIN_USER, INIT_SITES } from './actions';
// import { Sites } from './mock-sites';

// export interface IAppState {
//     contextUser: User;
//     siteHierarchy: Site[];
//     flatSites: Site[];
// }

// export const INITIAL_STATE: IAppState = {
//     contextUser: <User>{
//         LoginName: 'init'
//     }, 
//     siteHierarchy: null,
//     flatSites: null
// }

// export function rootReducer(state: IAppState, action) : IAppState{
//     switch(action.type){
//         case LOGIN_USER: 
//             return Object.assign({}, state, {
//                 contextUser: <User>{
//                     LoginName: 'FU'
//                 }
//             })
//         case INIT_SITES:
//             let pSites = action.payload;
//             let flat = flattenSites(action.payload, null);
//             return Object.assign({}, state, {
//                 siteHierarchy:  pSites,
//                 flatSites: flat
//             })
//     }
//     return state;
// }


// function flattenSites(site, flatArray){
//     if(!flatArray){
//         flatArray = [];
//     }
//     site.forEach(s => {
//         flatArray.push(s);
//         if(s.SubSites){
//             flattenSites(s.SubSites, flatArray);
//         }
//     });
//     return flatArray;
// }

// function initSites(site, level) {
//     site.forEach(s => {
//       s.isSelected = false;
//       s.level = level;
//       s.inheritOwnerAdmins = true;

//       if(level === 1){
//         s.inheritOwnerAdmins = false;
//       }

//       if(level === 2){
//         s.isOpen = false;
//       }else{
//         s.isOpen = true;
//       }
      
//       if(s.SubSites){
//           initSites(s.SubSites, level + 1);
//       }
//     });
//     //return site;
//   }

//   function setInheritance(sites, inheritFromSiteId){
//     sites.forEach(s => {
//       if(!inheritFromSiteId){
//         s.inheritFromSiteId = s.SiteID
//       }
//       if(s.inheritOwnerAdmins){
//         s.inheritFromSiteId = inheritFromSiteId;
//       }else{
//         s.inheritFromSiteId = s.SiteID
//       }
//       if(s.SubSites.length > 0){
//         setInheritance(s.SubSites, s.inheritFromSiteId)
//       }
//     });
//   }