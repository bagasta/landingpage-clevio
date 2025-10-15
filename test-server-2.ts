console.log('Starting test server 2...');

const next = require('next');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { setupSocket } = require('./src/lib/socket.ts');

async function testServer() {
  try {
    console.log('Creating Next.js app...');
    const dev = process.env.NODE_ENV !== 'production';
    const nextApp = next({
      dev,
      dir: process.cwd(),
      conf: dev ? undefined : { distDir: './.next' }
    });
    console.log('Next.js app created');

    console.log('Preparing Next.js app...');
    await nextApp.prepare();
    console.log('Next.js app prepared');

    console.log('Creating HTTP server...');
    const server = createServer();
    console.log('HTTP server created');

    console.log('Creating Socket.IO server...');
    const io = new Server(server, {
      path: '/api/socketio',
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
    console.log('Socket.IO server created');

    console.log('Setting up Socket.IO handlers...');
    setupSocket(io);
    console.log('Socket.IO handlers set up');

    console.log('All server components initialized successfully!');

  } catch (error) {
    console.error('Server initialization error:', error);
  }
}

testServer();