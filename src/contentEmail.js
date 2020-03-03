console.log('content email script loaded');

chrome.runtime.onMessage.addListener(async ({ mail, type, data }) => {
    console.log(mail, type, data);
    const src = chrome.extension.getURL(`src/email/${mail}.js`);
    const contentScript = await import(src);
    contentScript[type](data);
});
