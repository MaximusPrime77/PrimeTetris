const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function getScoreFilePath() {
    if (process.env.PORTABLE_EXECUTABLE_DIR) {
        return path.join(process.env.PORTABLE_EXECUTABLE_DIR, 'highscore.json');
    }
    try {
        return path.join(app.getPath('userData'), 'highscore.json');
    } catch (e) {
        return path.join(__dirname, 'highscore.json');
    }
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 850,
        minWidth: 800,
        minHeight: 650,
        autoHideMenuBar: true,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#0f172a',
            symbolColor: '#00f2fe',
            height: 30
        },
        title: "Prime Tetris",
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile('Tetris.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC Handler: Skoru Oku
ipcMain.handle('get-high-score', () => {
    try {
        const scoreFilePath = getScoreFilePath();
        if (fs.existsSync(scoreFilePath)) {
            const data = fs.readFileSync(scoreFilePath, 'utf8');
            return JSON.parse(data).highScore || 0;
        }
    } catch (e) {
        console.error('Skor okuma hatası:', e);
    }
    return 0;
});

// IPC Handler: Skoru Kaydet
ipcMain.on('save-high-score', (event, score) => {
    try {
        const scoreFilePath = getScoreFilePath();
        fs.writeFileSync(scoreFilePath, JSON.stringify({ highScore: score }));
    } catch (e) {
        console.error('Skor kaydetme hatası:', e);
    }
});

// IPC Handler: Skoru Sıfırla
ipcMain.on('reset-high-score', () => {
    try {
        const scoreFilePath = getScoreFilePath();
        fs.writeFileSync(scoreFilePath, JSON.stringify({ highScore: 0 }));
    } catch (e) {
        console.error('Skor sıfırlama hatası:', e);
    }
});
