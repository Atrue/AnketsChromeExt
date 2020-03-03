export function callWithTrigger(trigger, fn, maxRepeat=10) {
    setTimeout(() => {
        if (document.querySelector(trigger)) {
            fn();
        } else {
            if (maxRepeat) {
                callWithTrigger(trigger, fn, maxRepeat - 1);
            } else {
                console.error(`Cannot find ${trigger}`);
            }
        }
    }, 100);
}

export function changeReactValue(input, value) {
    const lastValue = input.value;
    input.value = value;
    const event = new Event('input', { bubbles: true });
    // hack React15
    event.simulated = true;
    // hack React16
    const tracker = input._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    input.dispatchEvent(event);
}
