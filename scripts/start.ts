import { exec } from 'shelljs';

async function spawnRenderer(): Promise<void> {
  exec('rollup -c -w', { async: true });
  exec('sirv public --no-clear --dev --port 1212', { async: true });
}

async function spawnMain(): Promise<void> {
  exec(
    'tsc src/main/main.ts src/main/preload.ts --outDir public/build --sourceMap',
    {
      async: false,
    }
  );
  exec('electron-forge start', { async: true });
}

spawnRenderer();
spawnMain();
