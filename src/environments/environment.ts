// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.



export const environment = {
  production: false,
  apiUri : 'http://localhost:3000',
  apiKey: '3ac62aaaa795a1ffefac8b11c614e263',
  email: '',
  picture: '',
  role: '',
  
  // auth0: 
  // {
  //   domain: 'dev-03fqz11ljqyddlnf.us.auth0.com',
  //   clientId: 'RG9DTHv4J16UJ4ooSP7a4TogO0iaw2A3',
  //   callback_URL: 'localhost:4200/callback',
  //   audience: 'movies'
  // }

  auth0:
  {
    domain: 'dev-lxb712ov0xtd5vjo.us.auth0.com',
    clientId: 'gKb6K4AQXrD0376Ne3lkYM8IeROnuG07',
    callback_URL: 'localhost:4200/callback',
    audience: 'movies'


    // domain: 'dev-17gue6f1pklecosb.us.auth0.com',
    // clientId: '245gnUBZghheFctCxUn9MR8jNGJW43xf',
    // callback_URL: 'localhost:4200/callback',
    // audience: 'movies'

  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
