<p align="center">
  <img src="icon.png" width="160" alt="Prime Tetris Logo">
</p>

# 🎮 Prime Tetris

**Prime Tetris** is a modern, feature-packed retro-futuristic Tetris game built with Electron, Web Audio API, dynamic neon glassmorphism UI, Gamepad support, multi-language localization (EN/TR), and flexible multi-platform distribution.

---

## 🌟 Key Features

- 🎨 **Modern Neon Glassmorphism UI**: Sleek cyber-retro aesthetic with dynamic animated glowing borders and vibrant typography.
- 🌐 **Multi-Language Support (EN / TR)**: Instant one-click toggle between English and Turkish with dynamically localized control reference cards (`ARROWS/WASD` and `YÖN/WASD`).
- 🔄 **High Score Management**: Real-time high score tracking with a one-click reset button and smooth visual animations.
- 🎮 **Gamepad & Keyboard Controllers**: Full Plug-and-Play support for Xbox, PlayStation, and generic PC controllers with auto-detection.
- 🔊 **Web Audio API Sound Effects**: Retro synthesized sound effects for piece drops, line clears, level ups, and game over states.
- 📦 **Triple Distribution Modes**:
  - 🚀 **Portable App**: Standalone `.exe` that stores scores in a dedicated `./data/` folder—ideal for USB drives.
  - 💻 **Desktop Installer**: Full Windows Setup wizard (`PrimeTetris Setup.exe`) with desktop shortcuts.
  - 🌐 **Web Ready**: Pure static web app running directly in modern web browsers using `localStorage`.

---

## 📸 Highlights & Gameplay

<p align="center">
  <img src="preview1.png" width="32%" alt="English Gameplay">
  <img src="preview2.png" width="32%" alt="Turkish Gameplay">
  <img src="preview3.png" width="32%" alt="Paused Screen">
</p>

- 🕹️ **Dual-Language Interface**: Seamlessly switch between English and Turkish on the fly.
- ⏸️ **Interactive Pause & Overlay**: Crisp paused screen graphics and modal game over overlays.
- 🎯 **Responsive Scoreboard**: Real-time score, level progression, next piece preview, and high score tracking.

---

## 🛠️ Installation & Build Commands

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/MaximusPrime77/PrimeTetris.git

# Navigate into the project directory
cd PrimeTetris

# Install dependencies
npm install
```

### Run in Development Mode
```bash
npm run dev
# or
npm start
```

### Build & Deploy All Versions
To generate the Portable `.exe`, Desktop `Setup.exe`, and Web `index.html` builds simultaneously:
```bash
npm run build
```
This automatically compiles and deploys binaries to the respective distribution directories (`PrimeTetrisPortable-app`, `PrimeTetrisDestkop-app`, and `PrimeTetrisWeb-app`).

---

## 🎮 Game Controls

| Action | Keyboard (EN / TR) | Gamepad |
| :--- | :--- | :--- |
| **Move** | ARROWS / WASD (YÖN / WASD) | D-Pad / Left Analog |
| **Rotate** | UP / W (ÜST / W) | A / X Buttons |
| **Soft Drop** | Down Arrow / S (ALT / S) | D-Pad Down / Analog |
| **Pause / Resume** | Space / P / Esc | Start Button |
| **Restart Game** | F | Select Button |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

Developed with ❤️ by Maximus Decimus Meridius.
