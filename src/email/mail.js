import { callWithTrigger, changeReactValue } from '../helpers.js';

export function login({ email, password }) {
    const nextSelector = 'button[data-test-id=next-button]';
    const passSelector = '.password input';
    const confirmSelector = 'button[data-test-id=submit-button]';

    function start() {
        document.querySelector(nextSelector).click();
        callWithTrigger(passSelector, fillPassword);
    }

    function fillPassword() {
        const inputPass = document.querySelector(passSelector);
        changeReactValue(inputPass, password);
        document.querySelector(confirmSelector).click();
    }

    callWithTrigger(nextSelector, start, 100);
}

export function registration({ password, date, firstName, lastName }) {
    const firstNameSelector = 'input[name=firstname]';
    const lastNameSelector = 'input[name=lastname]';
    const daySelector = '.b-date__day .b-dropdown__list__item';
    const monthSelector = '.b-date__month .b-dropdown__list__item';
    const yearSelector = '.b-date__year .b-dropdown__list__item';
    const maleSelector = 'input[name=sex][value=male]';
    const femaleSelector = 'input[name=sex][value=female]';
    const passwordSelector = 'input[name=password]';
    const passwordReSelector = 'input[name=password_retry]';
    const emailSelector = 'input[data-blockid=email_name]';
    const noPhoneSelector = '.js-signup-simple-link';

    function start() {
        document.querySelector(noPhoneSelector).click();
        const fullDate = new Date(date);
        document.querySelector(firstNameSelector).value = firstName;
        document.querySelector(lastNameSelector).value = lastName;
        document.querySelector(`${daySelector}[data-value="${fullDate.getDate() - 1}"]`).click();
        document.querySelector(`${monthSelector}[data-value="${fullDate.getMonth()}"]`).click();
        document.querySelector(`${yearSelector}[data-value="${fullDate.getFullYear()}"]`).click();
        const isFemale = lastName ? ['а','я'].includes(lastName[lastName.length - 1]) : false;
        document.querySelector(isFemale ? femaleSelector : maleSelector).click();
        document.querySelector(passwordSelector).click();
        document.querySelector(passwordSelector).value = password;
        document.querySelector(passwordReSelector).value = password;
        const focusEvent = new Event('focus', { bubbles: true });
        document.querySelector(emailSelector).dispatchEvent(focusEvent);
    }

    callWithTrigger('.b-panel__wrapper', start, 100);
}
