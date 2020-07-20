const electron = require("electron");
const ipc = electron.ipcRenderer;

const syncBtn = document.getElementById('syncBtn');
const asyncBtn = document.getElementById('asyncBtn');

// Sending event 'sync-message' from renderer to main
syncBtn.addEventListener('click', () => {
    console.log('sync msg 1');
    const reply = ipc.sendSync('sync-message');
    console.log(reply); // Undefined unless we returnValue in main
    console.log('sync msg 2');
});

// Sending event 'async-message' from renderer to main
asyncBtn.addEventListener('click', () => {
    console.log('async message 1 - sending async-message from renderer...');
    ipc.send('async-message');
    console.log('async message 2 - Sent async-message but this log appears first')
});

// Receiving 'async-reply' event from main
ipc.on('async-reply', (event, arg) => {
    const message = `Message reply: ${arg}`;
    console.log(message);
});