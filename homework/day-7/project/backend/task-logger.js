import { EventEmitter } from 'node:events';
import fs from 'node:fs/promises';
import path from 'node:path';

const logger = new EventEmitter();

// Log dosyasının kaydedileceği klasörü belirle
const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'activity.log');

logger.on('taskCreated', async (taskName) => {
  const logEntry = `[${new Date().toISOString()}] OLUŞTURULDU: ${taskName}\n`;
  
  try {
    // 1. Klasörün varlığını kontrol et, yoksa oluştur
    await fs.mkdir(LOG_DIR, { recursive: true });
    
    // 2. Log mesajını dosyaya ekle (append)
    await fs.appendFile(LOG_FILE, logEntry);
    
    console.log('Log başarıyla yazıldı.');
  } catch (err) {
    console.error('Log yazma hatası:', err);
  }
});

// TODO: 'taskDeleted' olayı için de bir listener ekle

export default logger;
