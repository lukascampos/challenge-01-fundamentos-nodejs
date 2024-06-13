import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';

const tasks = [];

export const routes = [
   {
      method: 'GET',
      path: buildRoutePath('/tasks'),
      handler: (req, res) => {
         return res.end(JSON.stringify(tasks));
      }  
   },
   {
      method: 'POST',
      path: buildRoutePath('/tasks'),
      handler: (req, res) => {
         const { title, description } = req.body

         tasks.push({
            id: randomUUID(),
            title,
            description,
            completed_at: null, 
            created_at: new Date(),
            updated_at: new Date()
         })

         return res.writeHead(201).end(JSON.stringify(tasks[tasks.length-1]));
      }
   },
   {
      method: 'DELETE',
      path: buildRoutePath('/tasks/:id'),
      handler: (req, res) => {

         const rowIndex = tasks.findIndex(row => row.id === req.params.id);

         if(rowIndex > -1){
            tasks.splice(rowIndex, 1);
            
            return res.writeHead(204).end();
         }

         return res.writeHead(404).end(JSON.stringify("Task not found"));
      }
   },
   {
      method: 'PUT',
      path: buildRoutePath('/tasks/:id'),
      handler: (req, res) => {
         const id = req.params.id;

         const rowIndex = tasks.findIndex(row => row.id === req.params.id);

         if(rowIndex > -1){
            const row = tasks[rowIndex]
            tasks[rowIndex] = { 
               id, 
               ...req.body, 
               completed_at: row.completed_at, 
               created_at: row.created_at, 
               updated_at: row.updated_at = new Date()
            }

            return res.writeHead(201).end(JSON.stringify(tasks[rowIndex]));
         }

         return res.writeHead(404).end(JSON.stringify("Task not found"));
      }
   },
]