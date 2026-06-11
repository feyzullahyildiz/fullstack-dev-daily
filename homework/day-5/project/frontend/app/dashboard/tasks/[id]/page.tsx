import SubtaskItem from '@/components/SubtaskItem';
import AddSubtaskForm from '@/components/AddSubtaskForm';

// Bu verinin bir veritabanından geldiğini hayal edin
const getTaskData = async (id: string) => {
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      
      <div className="space-y-2">
        <h2 className="font-semibold">Alt Görevler</h2>
        {task.subtasks.map((st) => (
          <SubtaskItem key={st.id} title={st.title} completed={st.completed} />
        ))}
      </div>

      {/* Yeni Alt Görev Ekleme Formu */}
      <div className="mt-8">
        <AddSubtaskForm taskId={task.id} />
      </div>
    </div>
  );
}
