'use server'

import { revalidatePath } from 'next/cache';

/**
 * Yeni bir alt görev ekler.
 * @param formData Formdan gelen veriler
 */
export async function createSubtask(formData: FormData) {
  // Veriyi al
  const title = formData.get('title') as string;
  const taskId = formData.get('taskId') as string;

  if (!title || title.trim() === '') {
    return { error: 'Başlık boş olamaz' };
  }

  // Simüle edilmiş veritabanı gecikmesi
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log(`[Server Action] Görev #${taskId} için yeni alt görev: ${title}`);

  // Cache temizleme (Sayfayı tazelemek için)
  revalidatePath(`/dashboard/tasks/${taskId}`);

  return { success: true };
}
