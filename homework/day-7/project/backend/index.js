import logger from './task-logger.js';

console.log('--- Task Management Backend Başladı ---');

// Task oluşturma olayını simüle et
console.log('Yeni görev oluşturuluyor...');
logger.emit('taskCreated', 'Next.js Caching Ödevi');

// Task silme olayını simüle et
// logger.emit('taskDeleted', 'Eski Görev');

console.log('Backend işlemleri devam ediyor...');
