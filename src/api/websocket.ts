import { io } from 'socket.io-client';
import { WEB_SOCKET_BASE_URL } from '@src/constants';

export const setupSocket = (roomId: string, username: string, onMessageReceived: (message: any) => void) => {
  // Create a WebSocket connection
  const socket = io(`${WEB_SOCKET_BASE_URL}/${roomId}/${username}`);
  // const socket = io(`${WEB_SOCKET_BASE_URL}/${roomId}/${username}`, {
  //   transports: ['websocket'], // Force WebSocket connection
  //   reconnection: true, // Auto-reconnect
  //   reconnectionAttempts: 5, // Retry connection 5 times before failing
  //   timeout: 10000, // 10 seconds timeout
  // });


  // Handle connection event
  socket.on('connect', () => {
    console.log('Socket connected');
  });

  // Handle incoming messages
  // socket.on('message', (message) => {
  //   onMessageReceived(message);
  // });

  // // Handle disconnection event
  // socket.on('disconnect', () => {
  //   console.log('Socket disconnected');
  // });

  // // Handle errors
  // socket.on('error', (error) => {
  //   console.error('Socket error:', error);
  // });

  // // Handle user join/leave events (optional)
  // socket.on('userJoined', (username) => {
  //   console.log(`${username} has joined the room`);
  // });

  // socket.on('userLeft', (username) => {
  //   console.log(`${username} has left the room`);
  // });

  return socket;
};

export const sendMessage = (socket, message) => {
  if (socket && socket.connected) {
    socket.emit('message', message);
  } else {
    console.error('Socket is not connected');
  }
};