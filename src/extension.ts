import * as vscode from 'vscode';
import * as path from 'path';
import { spawn } from 'child_process';

const SOUND_DIR = path.join(__dirname, '..', 'sounds');
const FFMPEG_PATH = 'C:\\ffmpeg-2025-04-21-git-9e1162bdf1-full_build\\bin\\ffplay.exe';

let wasFocused = true;
let skipClick = false;
let lastSoundTime = 0;

function playSound(file: string, override = false) {
    const now = Date.now();
    if (!override && now - lastSoundTime < 150) return;
    lastSoundTime = now;

    const soundPath = path.join(SOUND_DIR, file);
    spawn(FFMPEG_PATH, ['-nodisp', '-autoexit', soundPath]);
}

function randomFrom(list: string[]) {
    return list[Math.floor(Math.random() * list.length)];
}

function numbered(prefix: string, count: number) {
    return Array.from({ length: count }, (_, i) => `${prefix}${i + 1}.wav`);
}

const sounds = {
    typing: numbered('sand', 5),
    deleting: numbered('glass', 3),
    trapdoorOpen: numbered('Trapdoor_open', 5),
    trapdoorClose: numbered('Trapdoor_close', 3),
    click: ['click.wav'],
    levelup: ['levelup.wav'],
    error: numbered('no', 3),
    enchant: numbered('enchant', 3),
    chestOpen: ['chestopen.wav'],
    chestClose: ['chestclosed.wav'],
    anvil: ['anvil_use.wav', 'anvil_break.wav'],
    pistonInOut: ['in.wav', 'out.wav']
};

export function activate(context: vscode.ExtensionContext) {
    console.log('Minecraft Sounds Extension is active!');

    // Mojang intro on extension start
    playSound('mojang-logo-sound.wav', true);

    // Folder open/close
    if (vscode.workspace.workspaceFolders?.length) {
        playSound(randomFrom(sounds.chestOpen), true);
    }
    context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders((event) => {
        if (event.added.length > 0) {
            playSound(randomFrom(sounds.chestOpen), true);
        }
        if (event.removed.length > 0) {
            playSound(randomFrom(sounds.chestClose), true);
        }
    }));

    // Typing/backspace
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((e) => {
        if (!e.contentChanges.length) return;
        const text = e.contentChanges[0].text;
        playSound(randomFrom(text === '' ? sounds.deleting : sounds.typing));
        skipClick = true;
    }));

    // Save file → piston combo
    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(() => {
        playSound('in.wav', true);
        setTimeout(() => playSound('out.wav', true), 200);
        setTimeout(() => playSound(randomFrom(sounds.pistonInOut), true), 400);
        skipClick = true;
    }));

    // ✅ NEW: Error hover sound via HoverProvider
    const hoverProvider = vscode.languages.registerHoverProvider({ scheme: 'file' }, {
        provideHover(document, position) {
            const diagnostics = vscode.languages.getDiagnostics(document.uri);
            const diagAtCursor = diagnostics.find(d =>
                d.range.contains(position) &&
                d.severity === vscode.DiagnosticSeverity.Error
            );

            if (diagAtCursor) {
                playSound(randomFrom(sounds.error), true);
            }

            return undefined;
        }
    });
    context.subscriptions.push(hoverProvider);

    // Terminal open/close
    context.subscriptions.push(
        vscode.window.onDidOpenTerminal(() => playSound(randomFrom(sounds.enchant))),
        vscode.window.onDidCloseTerminal(() => playSound(randomFrom(sounds.enchant)))
    );

    // Task end
    context.subscriptions.push(vscode.tasks.onDidEndTaskProcess((e) => {
        playSound(randomFrom(e.exitCode === 0 ? sounds.levelup : sounds.error));
        skipClick = true;
    }));

    // Window minimize/maximize
    context.subscriptions.push(vscode.window.onDidChangeWindowState((state) => {
        if (state.focused && !wasFocused) {
            playSound(randomFrom(sounds.trapdoorOpen), true);
        } else if (!state.focused && wasFocused) {
            playSound(randomFrom(sounds.trapdoorClose), true);
        }
        wasFocused = state.focused;
        skipClick = true;
    }));

    // Big file open
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument((doc) => {
        const lineCount = doc.lineCount;
        const textSize = Buffer.byteLength(doc.getText(), 'utf8');
        if (lineCount > 10000 || textSize > 500000) {
            playSound(randomFrom(sounds.levelup), true);
        }
    }));

    // File deleted
    context.subscriptions.push(vscode.workspace.onDidDeleteFiles(() => {
        playSound('fizz.wav', true);
    }));

    // File renamed
    context.subscriptions.push(vscode.workspace.onDidRenameFiles(() => {
        playSound(randomFrom(sounds.anvil), true);
    }));

    // File created
    context.subscriptions.push(vscode.workspace.onDidCreateFiles(() => {
        playSound('launch1.wav', true);
    }));

    // Settings opened
    context.subscriptions.push(vscode.commands.registerCommand('extension.soundOpenSettings', async () => {
        playSound('anvil_land.wav', true);
        await vscode.commands.executeCommand('workbench.action.openSettings');
    }));

    // Undo
    context.subscriptions.push(vscode.commands.registerCommand('extension.mcsoundUndo', async () => {
        playSound('in.wav', true);
        await vscode.commands.executeCommand('undo');
    }));

    // Redo
    context.subscriptions.push(vscode.commands.registerCommand('extension.mcsoundRedo', async () => {
        playSound('out.wav', true);
        await vscode.commands.executeCommand('redo');
    }));

    // Click sound on cursor move (preserved)
    context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(() => {
        if (!skipClick) playSound(randomFrom(sounds.click));
        skipClick = false;
    }));
}

export function deactivate() {
    console.log('Minecraft Sounds Extension deactivated.');
}
