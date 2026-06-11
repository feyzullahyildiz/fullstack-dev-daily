"use client";

import { useState } from "react";

interface Subtask {
  id: number;
  title: string;
}

export default function SubtaskItem({ subtask }: { subtask: Subtask }) {
  // TODO: Bir 'done' state'i oluştur (varsayılan: false).
  
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b last:border-0">
      {/* 
          TODO: Bir checkbox input ekle. 
          'checked' değerini state'e bağla, 'onChange' ile state'i değiştir.
      */}
      <input type="checkbox" disabled />
      
      {/* 
          TODO: Eğer görev tamamlandıysa yazının üstünü çiz (line-through).
      */}
      <span className="text-gray-700">
        {subtask.title}
      </span>
    </div>
  );
}
