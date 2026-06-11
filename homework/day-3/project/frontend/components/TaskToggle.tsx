"use client";

import { useState } from "react";

export default function TaskToggle({ initialStatus }: { initialStatus: boolean }) {
  const [isCompleted, setIsCompleted] = useState(initialStatus);

  const toggleStatus = () => {
    // TODO: isCompleted durumunu tersine çevir.
  };

  return (
    <button
      onClick={toggleStatus}
      className={`px-4 py-2 rounded font-medium transition-colors ${
        isCompleted 
          ? "bg-green-500 hover:bg-green-600 text-white" 
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      {isCompleted ? "Tamamlandı" : "Tamamla olarak işaretle"}
    </button>
  );
}
