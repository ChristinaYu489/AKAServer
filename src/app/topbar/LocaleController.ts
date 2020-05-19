class LocaleController {
    private locale:string;
    constructor() {
        this.locale = null;
    }
    getLocale() {
        if(this.locale==null) {
            let locale = localStorage.getItem('locale');
            if(!locale) {
                locale = window.navigator.languages[1];
            }
            this.locale = locale;
        }
        return this.locale;
    }
    setLocale(locale:string) {
        this.locale = locale;
        localStorage.setItem('locale', locale);
    }
}
export let localeController = new LocaleController;