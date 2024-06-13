import fs from 'node:fs'

fs.readFile('./tasks.csv', async (err, data) => {
   if (err) {
      console.error(err)
      return
   }

   const tasks = await data.toString().replaceAll('\n', '').split('\r')
   tasks.splice(0, 1);

   tasks.map(row => {
      const [title, description] = row.split(',');

      fetch('http://localhost:3000/tasks', {
         method: 'POST',
         body: JSON.stringify({
            title,
            description
         }),
      })
   })
})