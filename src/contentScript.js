(function(){
    console.log('content script loaded');
    document.cookie = "ankAuth=1BCR";

    function replaceButton(button) {
        const newButton = button.cloneNode(true);
        button.replaceWith(newButton);

        return newButton;
    }

    function patchButtons() {
        if (location.hash === '#/send') {
            const button = document.querySelector('#modal-body .action a');
            replaceButton(button).addEventListener('click', login);
        } else {
            const [random, yandex, mail, _] = document.querySelectorAll('#modal-body .action a');
            replaceButton(random).addEventListener('click', () => registration(Math.random() > 0.3 ? 'mail' : 'yandex'));
            replaceButton(yandex).addEventListener('click', () => registration('yandex'));
            replaceButton(mail).addEventListener('click', () => registration('mail'));
        }
    }

    function login() {
        const [email, password] = [
            ...document.querySelectorAll('#modal-body .info textarea')
        ].slice(0, 2).map(input => input.value);
        const data = { email, password };
        chrome.runtime.sendMessage({ type: 'login', data });
    }

    function registration(mail) {
        const [firstName, ...lastNames] = document.querySelector('#modal-title span').innerText.split(' ');
        const lastName = lastNames.join(' ');
        const [password, date] = [
            ...document.querySelectorAll('#modal-body .info input')
        ].slice(1, 3).map(input => input.value);
        const data = { password, date, firstName, lastName };
        chrome.runtime.sendMessage({ mail, type: 'registration', data });
    }

    document.addEventListener('click', e => {
        if (document.querySelector('.table tbody').contains(e.target)) {
            patchButtons();
        }
    });
})();
