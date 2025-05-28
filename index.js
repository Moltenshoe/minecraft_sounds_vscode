const path = require('path');
const player = require('play-sound')();
const { spawn } = require('child_process');

function play(eventName) {
  const soundFile = path.join(__dirname, 'sounds', `${eventName}.wav`);

  // Try with `play-sound` first
  player.play(soundFile, (err) => {
    if (err) {
      console.warn(`[play-sound] Failed: ${err.message}`);
      // Fallback to ffplay if `play-sound` fails
      fallbackPlay(soundFile);
    }
  });
}

function fallbackPlay(filePath) {
  try {
    spawn('ffplay', ['-nodisp', '-autoexit', filePath], {
      detached: true,
      stdio: 'ignore'
    }).unref();
  } catch (error) {
    console.error(`[ffplay] Failed to play sound: ${error.message}`);
  }
}

const eventName = process.argv[2];
if (eventName) {
  play(eventName);
}
