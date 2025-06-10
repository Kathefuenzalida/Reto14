// app.js
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { readTasks, saveTasks } from './tareas.js';

yargs(hideBin(process.argv))
  .command({
    command: 'agregar',
    describe: 'Agregar una nueva tarea',
    builder: {
      descripcion: {
        describe: 'Descripción de la tarea',
        demandOption: true,
        type: 'string',
      },
    },
    handler: async (argv) => {
      const tasks = await readTasks();
      tasks.push({ descripcion: argv.descripcion });
      await saveTasks(tasks);
      console.log(`✅ Tarea "${argv.descripcion}" agregada.`);
    },
  })
  .command({
    command: 'eliminar',
    describe: 'Eliminar una tarea por su descripción',
    builder: {
      descripcion: {
        describe: 'Descripción de la tarea a eliminar',
        demandOption: true,
        type: 'string',
      },
    },
    handler: async (argv) => {
      let tasks = await readTasks();
      const beforeCount = tasks.length;
      tasks = tasks.filter(task => task.descripcion !== argv.descripcion);

      if (tasks.length === beforeCount) {
        console.log(`❌ No se encontró tarea con descripción "${argv.descripcion}".`);
      } else {
        await saveTasks(tasks);
        console.log(`✅ Tarea "${argv.descripcion}" eliminada.`);
      }
    },
  })
  .parse();
