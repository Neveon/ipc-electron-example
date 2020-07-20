const electron = require("electron");
const { app, BrowserWindow } = electron;

const path = require("path");
const ipc = electron.ipcMain;
const dialog = electron.dialog;

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile(__dirname + "/index.html");

  win.webContents.openDevTools();


  // garbage collection
  win.on("closed", () => {
    win = null;
  });
};

ipc.on("sync-message", (event) => {
  event.returnValue = 'sync-reply'; // To be returned for synchrnous ipc
});

ipc.on("async-message", (event) => {
  // Sending event back to sender (renderer) with a message
  // Works only for async
  event.sender.send('async-reply', 'Main process async reply');
});

app.on("ready", () => {
  createWindow();
});

// For macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win == null) {
    createWindow();
  }
});
