import fs from 'node:fs/promises';

/**
 * NODE.JS TEMELLERİ DENEYİ
 * Bu script Event Loop'un nasıl çalıştığını anlamanıza yardımcı olur.
 */

console.log('--- 1. Program Başladı (Synchronous) ---');

// 1. Asenkron Dosya Okuma
async function checkFiles() {
  try {
    // Proje içindeki bir dosyayı okumaya çalışalım
    const content = await fs.readFile('./package.json', 'utf-8');
    console.log('--- 4. Dosya Okundu (Async/Await I/O) ---');
    // console.log(content.substring(0, 50) + '...');
  } catch (err) {
    console.error('Dosya okuma hatası:', err.message);
  }
}

checkFiles();

// 2. Timer (Makro Task)
setTimeout(() => {
  console.log('--- 6. Timeout Çalıştı (Macro Task - 0ms) ---');
}, 0);

// 3. Promise (Mikro Task)
Promise.resolve().then(() => {
  console.log('--- 5. Promise Çözüldü (Micro Task) ---');
});

// 4. Bloklayıcı İşlem (Ana thread'i yoran işlem)
// Bunu açarsanız, üstteki asenkron işlemlerin bile geciktiğini göreceksiniz.
/*
console.log('Ağır hesaplama başlıyor...');
for(let i = 0; i < 1e9; i++) {} 
console.log('Ağır hesaplama bitti.');
*/

console.log('--- 2. Senkron Kod Sonu ---');
console.log('--- 3. Event Loop Artık Bekleyen İşleri Alabilir ---');
