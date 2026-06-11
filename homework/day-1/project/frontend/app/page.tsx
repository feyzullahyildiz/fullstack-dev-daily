export default function Home() {
  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Hoş Geldiniz!</h2>
      <p>Bu uygulama bir fullstack gelişim yolculuğunun ürünüdür.</p>
      <a href="/dashboard" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">
        Dashboard'a Git
      </a>
    </main>
  );
}
