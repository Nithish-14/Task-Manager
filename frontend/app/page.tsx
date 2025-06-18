'use client';

import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Task = {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'todo' | 'in_progress' | 'done'>('all');
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_URL}/api/tasks`);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  const handleDeleteClick = (id: string) => {
    setSelectedTaskId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`${API_URL}/api/tasks/${selectedTaskId}`, {
        method: 'DELETE',
      });
      setTasks((prev) => prev?.filter((task) => task.id !== selectedTaskId) || []);
    } catch (error) {
      console.error('Delete failed', error);
    } finally {
      setShowModal(false);
      setSelectedTaskId(null);
    }
  };

  const filteredTasks = tasks?.filter((task) => filter === 'all' || task.status === filter) ?? [];

  if (tasks === null) {
    return <p className="loading">Loading tasks...</p>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">All Tasks</h1>
        <button onClick={() => router.push('/tasks/add')} className="add-btn">
          Add Task
        </button>
      </div>

      <div className="filter-buttons">
        {['all', 'todo', 'in_progress', 'done'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`filter-button ${filter === status ? 'active' : ''}`}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-card">
              <div className="task-content">
                <div>
                  <h2 className="task-title">{task.title}</h2>
                  <p className="task-status">Status: {task.status}</p>
                  {task.dueDate && (
                    <p className="task-due">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  )}
                </div>
                <div className="task-actions">
                  <button onClick={() => router.push(`/tasks/edit/${task.id}`)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(task.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <DeleteConfirmModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
