import TaskToggle from "@/components/TaskToggle";

// TODO: Veritabanından veya bir API'dan veri çekiyormuş gibi simüle eden bir fonksiyon yaz.
// İpucu: async/await ve setTimeout kullanabilirsin.
async function getTask(id: string) {
  // Burası sunucu tarafında çalışacak.
  return {
    id,
    title: `Görev #${id}`,
    description: "Bu görev sunucu tarafında oluşturuldu ve detayları getirildi.",
    isCompleted: false,
  };
}

export default async function TaskDetailPage({ params }: { params: { id: string } }) {
  // TODO: getTask fonksiyonunu çağırarak görevi getir.
  const task = { title: "Taslak Görev", description: "...", isCompleted: false }; // Bu satırı silip gerçek veriyi al.

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{task.title}</h1>
      <p className="text-gray-600 my-4">{task.description}</p>
      
      {/* 
          TODO: TaskToggle bileşenini buraya ekle.
          initialStatus prop'u olarak task.isCompleted değerini geçmeyi unutma.
      */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-50">
        <p className="text-sm text-gray-500 mb-2">Interaktif Bölüm:</p>
        {/* <TaskToggle initialStatus={...} /> */}
      </div>
    </div>
  );
}
