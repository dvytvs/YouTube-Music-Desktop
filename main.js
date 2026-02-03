const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Убираем стандартное меню
Menu.setApplicationMenu(null);

// Создание окна с кнопками управления
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
      plugins: true,
      devTools: true
    },
    // Правильный путь к иконке
    icon: path.join(__dirname, 'build/icons/linux/256x256.png'),
    frame: true, // КНОПКИ УПРАВЛЕНИЯ ВКЛЮЧЕНЫ
    titleBarStyle: 'default',
    show: true,
    backgroundColor: '#000000',
    autoHideMenuBar: true
  });

  // Загружаем YouTube Music
  mainWindow.loadURL('https://music.youtube.com');
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
