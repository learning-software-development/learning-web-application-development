import {helloWorld} from './hello-world.js';

helloWorld();

import confetti from 'canvas-confetti';
confetti.create(document.getElementById('canvas'), {
  resize: true,
  useWorker: true,
 })({ particleCount: 200, spread: 200 });
