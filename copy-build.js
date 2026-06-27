const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const rootDir = path.join(projectDir, '..');
const distDir = path.join(projectDir, 'dist');

const portableTargetDir = path.join(rootDir, 'PrimeTetrisPortable-app');
const desktopTargetDir = path.join(rootDir, 'PrimeTetrisDestkop-app');

console.log('📦 Derleme sonrası dosyalar yerleştiriliyor...');

if (!fs.existsSync(distDir)) {
    console.error('❌ dist klasörü bulunamadı. Lütfen önce derleme yapın.');
    process.exit(1);
}

// dist içindeki exe dosyalarını bul
const files = fs.readdirSync(distDir);
const exeFiles = files.filter(file => file.endsWith('.exe') && !file.includes('builder'));

if (exeFiles.length === 0) {
    console.log('⚠️ dist klasöründe .exe dosyası bulunamadı.');
    process.exit(0);
}

exeFiles.forEach(exeFile => {
    const srcPath = path.join(distDir, exeFile);
    
    // Portable hedef klasörüne kopyala
    if (fs.existsSync(portableTargetDir)) {
        const destPath = path.join(portableTargetDir, 'PrimeTetris.exe');
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Portable sürüm yerleştirildi: ${destPath}`);
    }
    
    // Desktop hedef klasörüne kopyala
    if (fs.existsSync(desktopTargetDir)) {
        const destPath = path.join(desktopTargetDir, 'PrimeTetris.exe');
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Desktop sürüm yerleştirildi: ${destPath}`);
    }
});

console.log('🎉 Sürüm klasörlerine yerleştirme işlemi başarıyla tamamlandı!');
