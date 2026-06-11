'use client';

import { createSubtask } from '@/actions/subtask-actions';

interface AddSubtaskFormProps {
  taskId: string;
}

export default function AddSubtaskForm({ taskId }: AddSubtaskFormProps) {
  // Not: Normalde useFormStatus veya useActionState (React 19) ile loading state yönetilir.
  // Bu ödevde basit bir form action örneği yapıyoruz.

  return (
    <form action={createSubtask} className="mt-4 p-4 border rounded shadow-sm">
      <input type="hidden" name="taskId" value={taskId} />
      
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium">
          Yeni Alt Görev
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Görev adı..."
            className="flex-1 px-3 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ekle
          </button>
        </div>
      </div>
    </form>
  );
}
