const mailConfig = {
    yandex: {
        alias: ['yandex.ru'],
        login: 'https://passport.yandex.ru/passport?mode=auth&retpath=https://mail.yandex.ru/',
        registration: 'https://passport.yandex.ru/registration/mail?from=mail&origin=home_v14_ru&retpath=https%3A%2F%2Fmail.yandex.ru'
    },
    rambler: {
        alias: ['rambler.ru', 'lenta.ru', 'autorambler.ru', 'myrambler.ru', 'ro.ru'],
        login: 'https://mail-pda.rambler.ru/',
        registration: 'https://id.rambler.ru/account/?back=//mail.rambler.ru?rname=mail#registration'
    },
    mail: {
        alias:['mail.ru', 'bk.ru', 'inbox.ru', 'list.ru'],
        login: (object) => `https://account.mail.ru/login/?email=${object.email}`,
        registration: 'https://account.mail.ru/signup'
    },
    gmail: {
        alias: ["gmail.com"],
        login: 'https://accounts.google.com/Login#identifier',
        registration: 'https://accounts.google.com/SignUp?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ltmpl=default'
    }
};

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'developer.chrome.com'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
    chrome.runtime.onMessage.addListener(
    function({ mail, type, data }, sender, sendResponse) {
        if (!mail) {
            const domain = data.email.split('@')[1];
            mail = Object.keys(mailConfig).find(key => mailConfig[key].alias.includes(domain));
        }
        if (!mail) {
            console.error('cannot find config for email: ', data.email);
            return;
        }
        const url = typeof mailConfig[mail][type] === 'function' ? mailConfig[mail][type](data) : mailConfig[mail][type];

        chrome.tabs.create({
            url,
            index: sender.tab.index + 1,
        }, function(tab) {
            chrome.tabs.executeScript(tab.id, { file: 'src/contentEmail.js' }, function() {
                chrome.tabs.sendMessage(tab.id, { type, mail, data });
            });
        })
    })
});
