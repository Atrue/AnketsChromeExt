import { callWithTrigger, changeReactValue } from '../helpers.js';

export function login({ email, password }) {
    const loginId = '#passp-field-login';
    const passId = '#passp-field-passwd';

    function start() {
        const anotherAcc = document.querySelector('.passp-auth-header a[href*="/auth/list"]');
        if (anotherAcc.className.includes('passp-auth-header-link_visible')) {
            anotherAcc.click();
        }
        const anotherAcc2 = document.querySelector('.passp-account-list__sign-in-button');
        if (anotherAcc2) {
            anotherAcc2.click();
        }
        callWithTrigger(loginId, inputLogin);
    }

    function inputLogin() {
        const input = document.querySelector(loginId);
        changeReactValue(input, email);
        document.querySelector('.passp-sign-in-button button[type=submit]').click();
        callWithTrigger(passId, inputPassword);
    }

    function inputPassword() {
        const input = document.querySelector(passId);
        changeReactValue(input, password);
        document.querySelector('.passp-sign-in-button button[type=submit]').click();
    }

    callWithTrigger('.passp-auth-header', start, 100);
}

export function registration({ password, firstName, lastName }) {
    const firstNameSelector = '#firstname';
    const lastNameSelector = '#lastname';
    const emailSelector = '#login';
    const passSelector = '#password';
    const noPhone = '.link_has-no-phone';
    const passRepeatSelector = '#password_confirm';
    const answerSelector = '#hint_answer';

    function start() {
        changeReactValue(document.querySelector(firstNameSelector), firstName);
        changeReactValue(document.querySelector(lastNameSelector), lastName);
        changeReactValue(document.querySelector(passSelector), password);
        changeReactValue(document.querySelector(passRepeatSelector), password);
        document.querySelector(noPhone).click();
        changeReactValue(document.querySelector(answerSelector), '1');
        const focusEvent = new Event('focus', { bubbles: true });
        document.querySelector(emailSelector).dispatchEvent(focusEvent);
    }

    callWithTrigger('.registration__form', start, 100);
}
