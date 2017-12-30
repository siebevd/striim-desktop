const {
	app,
	BrowserWindow,
	globalShortcut,
	clipboard,
	ipcMain
} = require("electron");
const path = require("path");
const url = require("url");
const electronLocalshortcut = require("electron-localshortcut");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
	const {
		default: installExtension,
		REACT_DEVELOPER_TOOLS,
		REDUX_DEVTOOLS
	} = require("electron-devtools-installer");

	installExtension(REACT_DEVELOPER_TOOLS)
		.then(name => console.log(`Added Extension:  ${name}`))
		.catch(err => console.log("An error occurred: ", err));

	// Create the browser window.
	win = new BrowserWindow({
		width: 800,
		height: 580,
		titleBarStyle: "hidden-inset",
		resizable: false,
		backgroundColor: "#0b141f"
	});

	// and load the index.html of the app.
	win.loadURL(
		url.format({
			pathname: path.join(__dirname, "dist/index.html"),
			protocol: "file:",
			slashes: true
		})
	);

	// Open the DevTools.
	win.webContents.openDevTools();

	// Emitted when the window is closed.
	win.on("closed", () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
	createWindow();
	// Register the play/pause keyboard press
	globalShortcut.register("MediaPlayPause", () => {
		win.webContents.send("playpause", "toggle");
	});

	// Register the next keyboard press
	globalShortcut.register("MediaNextTrack", () => {
		win.webContents.send("nextTrack", "next");
	});

	// Register the prev keyboard press
	globalShortcut.register("MediaPreviousTrack", () => {
		win.webContents.send("prevTrack", "next");
	});

	electronLocalshortcut.register(win, "CommandOrControl+V", () => {
		// Catch the paste command and send it to the window
		win.webContents.send("paste", clipboard.readText());
	});

	ipcMain.on("resize", (ev, data) => {
		const { width, height } = data;
		// Resize the window to the new size
		win.setSize(width, height, true);
	});
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On macOS it is common for applications and their menu b ar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
