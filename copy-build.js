const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const rootDir = path.join(projectDir, '..');
const distDir = path.join(projectDir, 'dist');

const portableTargetDir = path.join(rootDir, 'PrimeTetrisPortable-app');
const desktopTargetDir = path.join(rootDir, 'PrimeTetrisDestkop-app');
const webTargetDir = path.join(rootDir, 'PrimeTetrisWeb-app');

console.log('📦 Derleme sonrası dosyalar ayrıştırılıp yerleştiriliyor...');

// 1. Web Sürümü Kopyalama (Özel Web / Wallpaper Düzenlemeleri Korunur)
if (fs.existsSync(webTargetDir)) {
    try {
        const htmlSrc = path.join(projectDir, 'Tetris.html');
        const htmlDest = path.join(webTargetDir, 'index.html');
        if (fs.existsSync(htmlSrc) && !fs.existsSync(htmlDest)) {
            fs.copyFileSync(htmlSrc, htmlDest);
            console.log(`🌐 Web sürümü (index.html) yerleştirildi.`);
        }

        const webAssets = ['icon.png', 'icon.ico', 'preview1.png', 'preview2.png', 'preview3.png'];
        webAssets.forEach(asset => {
            const assetSrc = path.join(projectDir, asset);
            const assetDest = path.join(webTargetDir, asset);
            if (fs.existsSync(assetSrc)) {
                fs.copyFileSync(assetSrc, assetDest);
            }
        });
        console.log(`🌐 Web sürümü asset'leri kopyalandı.`);
    } catch (e) {
        console.error(`⚠️ Web kopyalama hatası: ${e.message}`);
    }
}

// 2. Electron Masaüstü (Setup) ve Portable Masaüstü Çıktılarını Ayrıştırma
if (fs.existsSync(distDir)) {
    const files = fs.readdirSync(distDir);
    const exeFiles = files.filter(file => file.endsWith('.exe') && !file.includes('builder'));

    exeFiles.forEach(exeFile => {
        const srcPath = path.join(distDir, exeFile);
        const lowerName = exeFile.toLowerCase();
        
        // Eğer dosya ismi "setup" içeriyorsa -> Masaüstü Kurulum sürümü
        if (lowerName.includes('setup')) {
            if (fs.existsSync(desktopTargetDir)) {
                try {
                    const destPath = path.join(desktopTargetDir, 'PrimeTetris Setup.exe');
                    fs.copyFileSync(srcPath, destPath);
                    console.log(`💻 Masaüstü (Setup/Installer) sürüm yerleştirildi: ${destPath}`);
                } catch (e) {
                    console.error(`⚠️ Desktop kopyalama hatası: ${e.message}`);
                }
            }
        } else {
            // Aksi halde -> Portable sürüm
            if (fs.existsSync(portableTargetDir)) {
                try {
                    const destPath = path.join(portableTargetDir, 'PrimeTetris.exe');
                    fs.copyFileSync(srcPath, destPath);
                    console.log(`🚀 Portable sürüm yerleştirildi: ${destPath}`);
                } catch (e) {
                    console.error(`⚠️ Portable kopyalama hatası: ${e.message}`);
                }
            }
        }
    });
} else {
    console.log('⚠️ dist klasörü bulunamadı. Lütfen önce derleme yapın.');
}

console.log('🎉 Tüm sürüm klasörlerine yerleştirme işlemi başarıyla tamamlandı!');
