# Changelog

## [0.2.1] - Minor fixes

- ✅ **Fixed**: Villager "NO" sound now only plays when hovering over actual error squiggles. It no longer triggers while typing or backspacing near errors.
- ✅ **Preserved**: All original features remain intact:

## 🚀 [0.2.0]

### ✨ New Features

- **🎵 Mojang Startup Sound**
  - Plays `mojang-logo-sound.wav` when VS Code launches

- **💾 Save Sound Overhaul**
  - Triple piston sound combo:
    - `in.wav` → `out.wav` → random (`in.wav` or `out.wav`)

- **📛 Error Hover Villager No**
  - Plays random `no*.wav` when cursor hovers over an error or warning

- **🗑️ File Delete = Lava Burn**
  - `fizz.wav` plays when a file is deleted

- **🛠 File Rename = Anvil Sounds**
  - Random `anvil_use.wav` or `anvil_break.wav` on file rename

- **🎇 File Create = Firework Launch**
  - Plays `launch1.wav` when new files are created

- **⚙️ Settings Open = Anvil Land**
  - Plays `anvil_land.wav` when opening VS Code settings

- **🔁 Undo / Redo = Pistons**
  - Undo: `in.wav`
  - Redo: `out.wav`

---

### 🛠 Enhancements

- All sound logic modularized in `sounds` map
- Smarter throttling to avoid overlapping sounds
- Uses `vscode.commands.registerCommand()` to wrap default commands (undo, redo, settings)

---

### 📂 Previously Included Sounds

| Action                   | Sound(s)                        |
|--------------------------|----------------------------------|
| Typing                  | `sand*.wav`                     |
| Backspace               | `glass*.wav`                    |
| Task success/failure    | `levelup.wav`, `no*.wav`        |
| Terminal open/close     | `enchant*.wav`                  |
| Window minimize/maximize| `Trapdoor_open*`, `Trapdoor_close*` |
| Workspace open/close    | `chestopen.wav`, `chestclosed.wav` |
| Big file open           | `levelup.wav`                   |
| Clicks                  | `click.wav`                     |

## [0.1.5]

### ✨ New Features

- **💾 Save Sound (Piston Combo)**
  - Save now triggers a piston combo:
    - `in.wav` (extend)
    - `out.wav` (retract after 200ms)
    - Random `in.wav` or `out.wav` (after 400ms)

- **📛 Villager No on Error**
  - Hovering over an error or warning plays a random villager "No" sound (`no1.wav`, `no2.wav`, etc.)

- **📁 Folder Expand / Collapse**
  - Plays `chestopen.wav` when a folder is added to the workspace
  - Plays `chestclosed.wav` when a folder is removed

- **🛠 File Rename**
  - When renaming files, a random anvil sound (`anvil_use.wav` or `anvil_break.wav`) is played

- **📄 Big File Alert**
  - Opening a file with **>10,000 lines** or **>500KB** triggers the `levelup.wav` sound

---

### ✅ Enhancements

- Centralized all sound mappings with `randomFrom()` and `numbered()` helpers
- Improved click sound suppression using `skipClick` guard
- Sound triggers now feel more intentional and immersive

---

### 🔧 Technical Notes

- All sounds are stored in the `/sounds/` directory
- Sound playback uses `ffplay.exe` (make sure the path is set correctly)
- Compatible with all file types, VS Code themes, and interactions

## [0.1.3] - Minor Fixes

### Fixes
- **Chest Sounds** when opening file click sound is played

## [0.1.2] - Enhancements and Fixes

### ✨ Added
- **Trapdoor sounds** when the VSCode window is minimized or restored.
- **Terminal sounds** (Enchanting table) when opening or closing a terminal.
- **Anvil sounds** play when extensions are installed/uninstalled.
- Registered fallback `minecraft-sounds.click` command for future UI triggers.

### 🛠️ Fixed
- 🧠 Removed door sounds from tab switching (previously triggered incorrectly).
- 🧠 Sound prioritization: click.wav no longer plays when higher-priority UI sounds fire (like chest or anvil).

### ✅ Existing Features Retained
- Typing: sand steps
- Deleting: glass break
- Saving: orb pickup
- Opening/Closing files: chest sounds
- Build success: levelup
- Error: villager NO!

## [0.1.1] - 2025-04-24

### Added
- 🔊 Terminal open/close now plays random enchantment table sounds (`enchant1-3.wav`)
- 🗂️ Sidebar/panel open/close now plays custom door open/close sounds (`d_open*.wav`, `d_close*.wav`)
- 🛠️ Extension install/uninstall triggers anvil use/break sounds (`anvil_use.wav`, `anvil_break.wav`)
- 🖱️ UI interaction like theme switch plays click sound (`click.wav`)

### Changed
- 🔁 Typing and deleting sounds are now throttled to prevent overlapping spam
- 🛠️ Refactored sound triggering to use safer throttles and grouping
- 📁 Restructured sound file organization for easier maintenance

## [0.1.0] - 2025-04-24
### Fixed
- Prevented glass/sand sounds from queuing up after typing has stopped

## [0.0.1] - 2025-04-22
### Initial release
- Sand typing
- Glass delete
- Save/load sounds
- Villager "NO!" sounds for error exit codes
- Clean run sounds with piston effect
