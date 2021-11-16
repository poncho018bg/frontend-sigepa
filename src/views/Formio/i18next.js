/**
 * I18Next localization lib client side setup
 */
const i18n = window.i18next || {};
// noinspection JSUnresolvedVariable
const backend = window.i18nextXHRBackend || {};
// noinspection JSUnresolvedVariable
const detector = window.i18nextBrowserLanguageDetector || {};
var _es = "./es";

const i18nOptions = {
  fallbackLng: 'es',
  preload: ['en', 'es'],
  load: 'languageOnly', // Prevents backend from trying to load ./en-US/...
  ns: '_es',
  detectLanguage: true,
  detection: { order: ['cookie', 'querystring'], lookupCookie: 'locale', lookupQuerystring: 'locale', caches: false },
  defaultNS: '_es', // The name of your JSON file
  backend: { loadPath: '/json/{{lng}}/{{ns}}.json' },
  getAsync: false
};

/**
 * Initializes the i18next on the client.
 * Any script can utilize the localization mappings by
 * calling the window.i18next.t('key') method to localize a string.
 *
 * NOTE: In the client, use =>window.i18next.t('key')  NOT i18n.t
 */
i18n.use(detector).use(backend).init(i18nOptions).then(function (result) {
  console.log(`Localization ${(i18n.t('test') === 'loaded' ? 'is loaded' : 'failed to load')}`);
});
