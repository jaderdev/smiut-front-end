// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  appVersion: "v726demo1",
  USERDATA_KEY: "authf649fc9a5f55",
  isMockEnabled: true,
  language: "pt",
  urlAPI:
    "//localhost:3000/api",
  urlUploads:
    "//localhost/smiut/webservice/uploads/",
  urlSite: "//smiut.app",
  prod_sulfix: 'public',
  ewelinkConfig: {
    token: "0f0e0208-6f3f-43ed-b6f0-eeba5f6b7887",
    at: "fd67080991943f3c20f7cb968b12c4470dbd76fe",
    region: "us",
  }, firebaseConfig: {
    apiKey: "AIzaSyBx8mRvmRCEctisbraC0KGRBTUP3yGeA64",
    authDomain: "smiut-app.firebaseapp.com",
    databaseURL: "https://smiut-app-default-rtdb.firebaseio.com",
    projectId: "smiut-app",
    storageBucket: "smiut-app.appspot.com",
    messagingSenderId: "341323472271",
    appId: "1:341323472271:web:e6ace4168aaa24c918fffa"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
