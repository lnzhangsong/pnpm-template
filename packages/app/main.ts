// eslint-disable-next-line import/no-extraneous-dependencies
import {
	app, BrowserWindow,
} from "electron";
import isDev from "electron-is-dev";
import service from "service";

let mainWindow: BrowserWindow = null;
const createWindow = () => {
	const server = service.listen(10000);
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
	});
	mainWindow.webContents.openDevTools();
	mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${__dirname}/../build/index.html`);
	// mainWindow.loadFile("index.html");
	mainWindow.on("closed", () => {
		mainWindow = null;
		server.close();
	});
};
app.on("ready", createWindow);
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});
