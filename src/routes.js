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

         return res.writeHead(201).end();
      }
   }
]