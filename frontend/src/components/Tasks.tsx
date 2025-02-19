import { useState, useEffect } from 'react';
import { comm, Task } from '../comm';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';

export function Tasks({ token }: { token: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasks = await comm.getTasks(token);
      setTasks(tasks);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await comm.createTask(token, { ...newTask, isComplete: false });
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleUpdateTask = async (task: Task) => {
    try {
      await comm.updateTask(token, task.id, task);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await comm.deleteTask(token, taskId);
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <Container className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleCreateTask} className="mb-8">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Task
        </Button>
      </Form>

      <div className="space-y-4">
        {tasks.map(task => (
          <Card key={task.id} className="mb-3">
            <Card.Body>
              {editingTask?.id === task.id ? (
                <div className="space-y-4">
                  <Form.Control
                    type="text"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                    className="mb-3"
                  />
                  <Form.Control
                    as="textarea"
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                    className="mb-3"
                  />
                  <div className="d-flex gap-2">
                    <Button variant="success" onClick={() => handleUpdateTask(editingTask)}>
                      Save
                    </Button>
                    <Button variant="secondary" onClick={() => setEditingTask(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <Row className="align-items-center justify-content-between">
                    <Col>
                      <h3 className="text-xl font-semibold">{task.title}</h3>
                    </Col>
                    <Col xs="auto">
                      <div className="d-flex gap-2">
                        <Button variant="primary" onClick={() => setEditingTask(task)}>
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteTask(task.id)}>
                          Delete
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <p className="text-gray-600 mt-2">{task.description}</p>
                  <div className="mt-2">
                    <Form.Check
                      type="checkbox"
                      label="Complete"
                      checked={task.isComplete}
                      onChange={() => handleUpdateTask({ ...task, isComplete: !task.isComplete })}
                    />
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}