import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages() {
    const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
    const messages = {}
    const languages = []
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
            const locale = matched[1]
            messages[locale] = locales(key)
            languages.push(matched[1])
        }
    })
    Vue.prototype.$locales = languages
    return messages
}

export default new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || localStorage.getItem('lang') || 'English',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'English',
    messages: loadLocaleMessages()
})