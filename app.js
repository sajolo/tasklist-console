require("colors");

const {
    guardarDB,
    leerDB
} = require("./helpers/guardarArchivo");
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist,
} = require("./helpers/inquirer");

const Tareas = require("./models/tareas");

const main = async () => {
    let opt = "";
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        //Esta función carga las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //Esta función imprime el menú
        opt = await inquirerMenu();

        switch (opt) {
            case "1":
                //Para crear una tarea
                const desc = await leerInput("Descripción:");
                tareas.crearTarea(desc);
                break;

            case "2":
                tareas.listadoCompleto();
                break;

            case "3": //Lista las tareas completadas
                tareas.listarPendientesCompletadas(true);
                break;

            case "4": //Lista las tareas pendientes
                tareas.listarPendientesCompletadas(false);
                break;

            case "5": //Muestra el listado de tareas con la checklist de las marcadas como completadas y las que no
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;

            case "6": //Para eliminar una tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== "0") {
                    const ok = await confirmar("¿Está seguro?");
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada");
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();
    } while (opt !== "0");

};

main();