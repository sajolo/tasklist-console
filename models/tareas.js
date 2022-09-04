const Tarea = require('./tarea');

class Tareas {

    //Defino listado como objeto y no como matriz de strings para luego poder hacer referencia a listado y acceder a la propiedad que me interese, en este caso pensé en
    //acceder a un id de la tarea de esta forma: tareas._listado[tarea.id];
    //El listado contendrá varias tareas de esta manera -> _listado: {'id-xxxx-xxxx-xxxx': {tarea1}, {tarea2}...}
    _listado = {
        'abc': 123
    };

    //Con este getter convierto el listado de objeto a matriz para que al imprimirse pueda acceder sólo a la descripción o al id como string directamente
    get listadoArr() {

        const listado = [];
        //Retorno una matriz de strings con el Object.keys y extraigo cada clave (key) de _listado y la añado con push() al nuevo listado que es una matriz
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }


    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {

        if (this._listado[id]) {
            delete this._listado[id];
        }

    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }


    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        console.log();
        this.listadoArr.forEach((tarea, i) => {

            const idx = `${i + 1}`.green;
            const {
                desc,
                completadoEn
            } = tarea;
            const estado = (completadoEn) ?
                'Completada'.green :
                'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado }`);

        });
    }

    listarPendientesCompletadas(completadas = true) {

        console.log();
        let contador = 0;
        this.listadoArr.forEach(tarea => {

            const {
                desc,
                completadoEn
            } = tarea;
            const estado = (completadoEn) ?
                'Completada'.green :
                'Pendiente'.red;
            if (completadas) {
                // mostrar completadas
                if (completadoEn) {
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn.green }`);
                }
            } else {
                // mostrar pendientes
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
                }
            }

        });

    }

    //Este método cambia a completada una tarea
    toggleCompletadas(ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this.listadoArr.forEach(tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }

        });


    }

}



module.exports = Tareas;