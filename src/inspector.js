import * as inspector from 'node:inspector/promises';
import fs from 'node:fs';

const session = new inspector.Session();

async function startCPUProfile() {
  try {
    session.connect();

    await session.post('Profiler.enable');
    await session.post('Profiler.start');
  } catch (err) {
    console.error(err);
  }
}

async function stopCPUProfile() {
  try {
    const { profile } = await session.post('Profiler.stop');
    fs.writeFileSync('./profile.cpuprofile', JSON.stringify(profile));
    session.disconnect();
  } catch (err) {
    console.error(err);
  }
}

process.on('SIGUSR1', startCPUProfile);
process.on('SIGUSR2', stopCPUProfile);
