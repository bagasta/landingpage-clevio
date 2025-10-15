console.log('Starting test server...');

try {
  // Test imports step by step
  console.log('Importing Next.js...');
  const next = require('next');
  console.log('Next.js imported successfully');

  console.log('Importing http...');
  const { createServer } = require('http');
  console.log('http imported successfully');

  console.log('Importing socket.io...');
  const { Server } = require('socket.io');
  console.log('socket.io imported successfully');

  console.log('Importing local modules...');
  const setupSocket = require('./src/lib/socket.ts').setupSocket;
  console.log('socket.ts imported successfully');

  console.log('All imports successful!');

} catch (error) {
  console.error('Import error:', error);
}