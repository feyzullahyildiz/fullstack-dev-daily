import SubtaskItem from '@/components/SubtaskItem';
import AddSubtaskForm from '@/components/AddSubtaskForm';

// TODO: Caching davranışını test etmek için aşağıdaki satırı yorumdan çıkarıp build almayı dene
// export const dynamic = 'force-dynamic'

const getTaskData = async (id: string) => {
  // Veritabanı simülasyonu
  return {
    id,
    title: 'Dashboard API Entegrasyonu',
    subtasks: [
      { id: '1', title: 'Endpointleri belirle', completed: true },
      { id: '2', title: 'Zod şemalarını yaz', completed: false },
    ],
  };
};

export default async function TaskDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const task = await getTaskData(params.id);
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
          Son Render: {currentTime}
        </span>
      </div>
      
      <div className="space-y-2">
        <h2 className="font-semibold text-gray-700">Alt Görevler</h2>
        {task.subtasks.map((st) => (
          <SubtaskItem key={st.id} title={st.title} completed={st.completed} />
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <AddSubtaskForm taskId={task.id} />
      </div>
    </div>
  );
}
