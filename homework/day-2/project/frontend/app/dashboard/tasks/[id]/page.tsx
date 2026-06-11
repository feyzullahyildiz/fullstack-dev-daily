export default function TaskDetailPage({ params }: { params: { id: string } }) {
  // TODO: params içinden id'yi al ve ekranda göster
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Görev Detayı</h1>
      <p className="mt-2">Görüntülenen Görev ID: { /* Buraya id gelecek */ }</p>
    </div>
  );
}
