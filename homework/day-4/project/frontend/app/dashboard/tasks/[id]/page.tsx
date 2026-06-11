import TaskToggle from "@/components/TaskToggle";
import SubtaskItem from "@/components/SubtaskItem";

async function getTask(id: string) {
  // Simüle edilmiş gecikme
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id,
    title: `Görev #${id}`,
    description: "Bu görev sunucu tarafında oluşturuldu.",
    isCompleted: false,
    subtasks: [
      { id: 1, title: "Gereksinimleri analiz et" },
      { id: 2, title: "Taslağı oluştur" },
      { id: 3, title: "Kodlamaya başla" },
    ],
  };
}

export default async function TaskDetailPage({ params }: { params: { id: string } }) {
  const task = await getTask(params.id);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{task.title}</h1>
      <p className="text-gray-600 my-4">{task.description}</p>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Alt Görevler</h2>
        <div className="space-y-2 border rounded-lg p-4 bg-white">
          {task.subtasks.map((subtask) => (
            /* 
               TODO: SubtaskItem bileşenini buraya ekle.
               Prop olarak 'subtask' objesini geç.
            */
            <div key={subtask.id} className="text-gray-400 italic text-sm">
              SubtaskItem buraya gelecek...
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 p-6 border-t">
        <p className="text-sm text-gray-500 mb-4">Ana Görev Durumu:</p>
        <TaskToggle initialStatus={task.isCompleted} />
      </div>
    </div>
  );
}
