'use client';

import { useState, useEffect } from 'react';

type TaskData = {
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  dueDate?: string | null;
};

type Props = {
  initialData?: TaskData;
  onSubmit: (data: TaskData) => void;
  isEditing?: boolean;
};

export default function TaskForm({ initialData, onSubmit, isEditing = false }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'todo' | 'in_progress' | 'done'>('todo');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setStatus(initialData.status);
      setDueDate(initialData.dueDate ? initialData.dueDate.slice(0, 10) : '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required.');
      return;
    }
    onSubmit({
      title,
      description,
      status,
      dueDate: dueDate || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full border px-4 py-2 rounded"
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border px-4 py-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full border px-4 py-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskData['status'])}
      >
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <input
        type="date"
        className="w-full border px-4 py-2 rounded"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isEditing ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
}
