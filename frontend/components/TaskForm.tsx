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
    <form onSubmit={handleSubmit} className="task-form">
      <input
        className="form-input"
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="form-textarea"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="form-select"
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskData['status'])}
      >
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <input
        type="date"
        className="form-input"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit" className="form-submit-btn">
        {isEditing ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
}
