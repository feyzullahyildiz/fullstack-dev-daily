export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <nav>
          <ul className="space-y-2">
            <li><a href="/dashboard" className="text-blue-600 hover:underline">Görevler</a></li>
            <li><a href="/dashboard/settings" className="text-blue-600 hover:underline">Ayarlar</a></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
