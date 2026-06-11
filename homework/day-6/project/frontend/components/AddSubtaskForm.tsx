'use client';

import { useActionState } from 'react';
import { createSubtask, FormState } from '@/actions/subtask-actions';
import PendingButton from './PendingButton';

interface AddSubtaskFormProps {
  taskId: string;
}

const initialState: FormState = {};

export default function AddSubtaskForm({ taskId }: AddSubtaskFormProps) {
  // useActionState (React 19) ile state ve action yönetimi
  const [state, formAction] = useActionState(createSubtask, initialState);

  return (
    <form action={formAction} className="mt-4 p-4 border rounded shadow-md bg-white">
      <input type="hidden" name="taskId" value={taskId} />
      
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-bold text-gray-700">
          Alt Görev Ekle
        </label>
        
        <div className="flex gap-2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="En az 3 karakter..."
            className={`flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
              state?.error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            }`}
          />
          <PendingButton />
        </div>

        {/* Hata Mesajı */}
        {state?.error && (
          <p className="text-xs text-red-600 mt-1 font-medium italic">
            ⚠️ {state.error}
          </p>
        )}

        {/* Başarı Mesajı */}
        {state?.success && (
          <p className="text-xs text-green-600 mt-1 font-medium">
            ✅ Alt görev başarıyla eklendi!
          </p>
        )}
      </div>
    </form>
  );
}
