'use server'

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Validasyon Şeması
const SubtaskSchema = z.object({
  title: z.string()
    .min(3, { message: "Başlık en az 3 karakter olmalıdır" })
    .max(50, { message: "Başlık en fazla 50 karakter olabilir" }),
  taskId: z.string().min(1)
});

export type FormState = {
  error?: string;
  success?: boolean;
};

/**
 * useActionState ile uyumlu Server Action
 */
export async function createSubtask(prevState: FormState, formData: FormData): Promise<FormState> {
  // Veriyi doğrula
  const validatedFields = SubtaskSchema.safeParse({
    title: formData.get('title'),
    taskId: formData.get('taskId'),
  });

  // Hata varsa dön
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.title?.[0],
    };
  }

  const { title, taskId } = validatedFields.data;

  try {
    // Veritabanı işlemini simüle et
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(`[DB] Görev #${taskId} için alt görev oluşturuldu: ${title}`);
    
    revalidatePath(`/dashboard/tasks/${taskId}`);
    return { success: true };
  } catch (e) {
    return { error: "Sunucu tarafında beklenmedik bir hata oluştu." };
  }
}
