// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUsername: 'tmorren',
  apiPassword: '80GFTJ3iOo7s',
  baseUrl: 'https://api.mysportsfeeds.com/v1.1/pull/nba',

  newsApiKey: 'bede819a64b4415a881b4b9327cbe0f2',
  newsApiBaseUrl: 'https://newsapi.org/v2/top-headlines',
  newsApiUrl: 'https://newsapi.org/v2/top-headlines?sources=espn&q=nba&apiKey=bede819a64b4415a881b4b9327cbe0f2'  
};
