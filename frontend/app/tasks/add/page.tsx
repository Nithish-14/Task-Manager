'use client';

import { useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm';

export default function AddPage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push('/');
    } else {
      alert('Failed to create task');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Add Task</h1>
      <TaskForm onSubmit={handleCreate} />
    </div>
  );
}
