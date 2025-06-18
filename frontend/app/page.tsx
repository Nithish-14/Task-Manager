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
      console.error("Delete failed", error);
    } finally {
      setShowModal(false);
      setSelectedTaskId(null);
    }
  };

  if (tasks === null) {
    return <p className="">Loading tasks...</p>;
  }

  return (
    <div className="">
      <div className="">
        <h1 className="">All Tasks</h1>
        <button
          onClick={() => router.push('/tasks/add')}
          className=""
        >
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="">
          {tasks.map((task) => (
            <li key={task.id} className="">
              <div className="">
                <div>
                  <h2 className="">{task.title}</h2>
                  <p className="">Status: {task.status}</p>
                  {task.dueDate && (
                    <p className="">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="">
                  <button
                    onClick={() => router.push(`/tasks/edit/${task.id}`)}
                    className=""
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(task.id)}
                    className=""
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
