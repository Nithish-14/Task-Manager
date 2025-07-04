'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm';

type TaskData = {
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  dueDate?: string | null;
};

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`);
        if (!res.ok) throw new Error('Task not found');
        const data = await res.json();
        setTask(data);
      } catch (error) {
        alert('Failed to fetch task');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTask();
  }, [id, router]);

  const handleUpdate = async (updatedTask: TaskData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });

    if (res.ok) {
      router.push('/');
    } else {
      alert('Failed to update task');
    }
  };

  if (loading) return <p className="loading-message">Loading...</p>;

  if (!task) return <p className="loading-message">Task not found.</p>;

  return (
    <div className="form-page">
      <h1 className="form-title">Edit Task</h1>
      <TaskForm initialData={task} onSubmit={handleUpdate} isEditing />
    </div>
  );
}
