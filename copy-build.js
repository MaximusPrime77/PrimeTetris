const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const rootDir = path.join(projectDir, '..');
const distDir = path.join(projectDir, 'dist');

const portableTargetDir = path.join(rootDir, 'PrimeTetrisPortable-app');
const desktopTargetDir = path.join(rootDir, 'PrimeTetrisDestkop-app');
const webTargetDir = path.join(rootDir, 'PrimeTetrisWeb-app');

console.log('📦 Derleme sonrası dosyalar yerleştiriliyor...');

// 1. Web Sürümü Kopyalama (Tetris.html -> index.html ve gerekli asset'ler)
if (fs.existsSync(webTargetDir)) {
    try {
        // Tetris.html dosyasını index.html olarak kopyala
        const htmlSrc = path.join(projectDir, 'Tetris.html');
        const htmlDest = path.join(webTargetDir, 'index.html');
        if (fs.existsSync(htmlSrc)) {
            fs.copyFileSync(htmlSrc, htmlDest);
            console.log(`🌐 Web sürümü (index.html) yerleştirildi: ${htmlDest}`);
        }

        // Görselleri ve simgeleri kopyala
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
        console.error(`⚠️ Web sürümü kopyalanırken hata: ${e.message}`);
    }
}

// 2. Electron Masaüstü / Portable Masaüstü Çıktılarını Kopyalama
if (fs.existsSync(distDir)) {
    const files = fs.readdirSync(distDir);
    const exeFiles = files.filter(file => file.endsWith('.exe') && !file.includes('builder'));

    exeFiles.forEach(exeFile => {
        const srcPath = path.join(distDir, exeFile);
        
        // Portable hedef klasörüne kopyala
        if (fs.existsSync(portableTargetDir)) {
            try {
                const destPath = path.join(portableTargetDir, 'PrimeTetris.exe');
                fs.copyFileSync(srcPath, destPath);
                console.log(`✅ Portable sürüm yerleştirildi: ${destPath}`);
            } catch (e) {
                console.error(`⚠️ Portable kopyalama hatası (Uygulama açık olabilir): ${e.message}`);
            }
        }
        
        // Desktop hedef klasörüne kopyala
        if (fs.existsSync(desktopTargetDir)) {
            try {
                const destPath = path.join(desktopTargetDir, 'PrimeTetris.exe');
                fs.copyFileSync(srcPath, destPath);
                console.log(`✅ Desktop sürüm yerleştirildi: ${destPath}`);
            } catch (e) {
                console.error(`⚠️ Desktop kopyalama hatası (Uygulama açık olabilir): ${e.message}`);
            }
        }
    });
} else {
    console.log('⚠️ dist klasörü bulunamadı. Lütfen önce derleme yapın.');
}

console.log('🎉 Sürüm klasörlerine yerleştirme işlemi tamamlandı!');
