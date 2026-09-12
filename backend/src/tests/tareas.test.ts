// backend/src/tests/tareas.test.ts
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import express from 'express';

// 1. Configuramos una instancia de Express aislada para la prueba
// (En un proyecto real ya configurado, simplemente harías: import app from '../app')
const app = express();
app.use(express.json());

// Simulamos el endpoint con la corrección del BUG 3 (no acepta títulos vacíos)
app.post('/tareas', (req, res) => {
  const { titulo } = req.body;
  if (!titulo || !titulo.trim()) {
    return res.status(400).json({ error: 'El titulo es obligatorio' });
  }
  res.status(201).json({ id: 1, titulo });
});

// 2. Escribimos las pruebas
describe('API de tareas', () => {
  it('crea una tarea nueva exitosamente', async () => {
    // Act
    const res = await request(app)
      .post('/tareas')
      .send({ titulo: 'Escribir informe' });
 
    // Assert
    expect(res.status).toBe(201);
    expect(res.body.titulo).toBe('Escribir informe');
  });

  it('rechaza crear una tarea con titulo vacio', async () => {
    // Act
    const res = await request(app)
      .post('/tareas')
      .send({ titulo: '   ' }); // Enviamos puros espacios
 
    // Assert
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('El titulo es obligatorio');
  });
});