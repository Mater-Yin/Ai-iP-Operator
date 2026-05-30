const { app, BrowserWindow, dialog, Menu } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let mainWindow = null;
let serverProcess = null;
const isDev = !app.isPackaged;

// Determine ports
const NEXT_PORT = isDev ? 3000 : 3456;
const BACKEND_PORT = isDev ? 8000 : 8001;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: "AI IP操盘手",
    icon: path.join(__dirname, "../public/icon.png"),
    backgroundColor: "#F8FAFC",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Build application menu
  const menuTemplate = [
    {
      label: "文件",
      submenu: [
        { label: "关于 AI IP操盘手", role: "about" },
        { type: "separator" },
        { label: "退出", accelerator: "CmdOrCtrl+Q", role: "quit" },
      ],
    },
    {
      label: "视图",
      submenu: [
        { label: "重新加载", accelerator: "CmdOrCtrl+R", role: "reload" },
        { label: "开发者工具", accelerator: "F12", role: "toggleDevTools" },
        { type: "separator" },
        { label: "放大", role: "zoomIn" },
        { label: "缩小", role: "zoomOut" },
        { label: "重置缩放", role: "resetZoom" },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

  if (isDev) {
    // Development: load Next.js dev server
    mainWindow.loadURL(`http://localhost:${NEXT_PORT}`);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    // Production: start Next.js server then load
    startNextServer();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function startNextServer() {
  const nextDir = path.join(process.resourcesPath, "app");
  const serverPath = path.join(nextDir, "node_modules/next/dist/bin/next");

  serverProcess = spawn(process.execPath, [serverPath, "start", "-p", String(NEXT_PORT)], {
    cwd: nextDir,
    env: { ...process.env, NODE_ENV: "production" },
    stdio: ["pipe", "pipe", "pipe"],
  });

  serverProcess.stdout.on("data", (data) => {
    const output = data.toString();
    console.log("[Next]", output);
    if (output.includes("http://localhost")) {
      mainWindow?.loadURL(`http://localhost:${NEXT_PORT}`);
    }
  });

  serverProcess.stderr.on("data", (data) => {
    console.error("[Next Error]", data.toString());
  });

  serverProcess.on("error", (err) => {
    console.error("Failed to start Next server:", err);
    dialog.showErrorBox("启动失败", "无法启动应用服务器，请重新安装。");
  });
}

// Start the backend server (production only, dev runs separately)
function startBackend() {
  // For now backend runs as a separate service
  // In full desktop version, we'll bundle it here
  console.log(`Backend API expected at http://localhost:${BACKEND_PORT}`);
}

app.whenReady().then(() => {
  createWindow();
  if (!isDev) startBackend();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
});
