const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Полностью убираем меню
Menu.setApplicationMenu(null);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      devTools: true
    },
    icon: path.join(__dirname, 'build/icons/linux/256x256.png'),
    frame: true,
    titleBarStyle: 'default',
    show: false, // Сначала создаем скрытым, чтобы не было белой вспышки
    backgroundColor: '#000000',
    autoHideMenuBar: true
  });

  mainWindow.loadURL('https://music.youtube.com');

  // Показываем окно, когда страница готова, чтобы не лагало при запуске
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // ГАРАНТИРОВАННОЕ ЗАКРЫТИЕ ПРИЛОЖЕНИЯ
  mainWindow.on('closed', () => {
    app.quit();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Для Linux и Windows закрываем процесс сразу
app.on('window-all-closed', () => {
  app.quit();
});

// На всякий случай форсируем выход, если Electron тупит
app.on('before-quit', () => {
  process.exit(0);
});
