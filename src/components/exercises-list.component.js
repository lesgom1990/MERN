import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//componente exercise:

/* de hecho se tienen dos componentes aca: Exercise y ExercisesList
el componente Exercise es implementado como un componente funcional
de react, mientras que el segundo es implementado como un class component
el componente funcional no tiene estado en su ciclo de vida.
por lo que solo acepta props y retorna JSX, el componente Exercise
retorna las filas de las tablas
en el link va a cargar una ruta usualmente, pero para este caso
va a cargar otro componente de la página, en este caso edit/props del 
id del exercise, so este es un componente que vamos a crear luego del edit
 luego se tiene el botón delete que elimina un id al dar click
*/
const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  )

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);
        this.state = { exercises: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data }) //aca se mete toda la info de los exercises
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise = (id) => {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(response => console.log(response.data));//loguea lo que se ha eliminado del backend
        /*
        despues de eliminar el exercise de la base de datos, vamos a eliminarlo también
        de lo que ha sido displayed al usuario, esto va a ser una tabla y va a haber una
        fila para cada exercise, y vamos a eliminar ese elemento de la tabla
        para esto se hace un setstate del exercise como se muestra a continuación:
        */

        this.setState({
            exercises: this.state.exercises.filter(element => element._id !== id)
        })//react automáticamente actualiza la página con el nuevo estado
    }//el arreglo de exercises se filtra, retornando solo ciertos elementos
    /* entonces para cada elemento del arreglo exercises 
    vamos a retornar el._id que no es igual al id. 
    */

    //a continuación se muestra el método que retorna las filas de la tabla:
    /*entonces para cada elemento llamado currentexercise 
    se retorna el componente Exercise, entonces para cada elemento del exercise array
    se retorna un componente que es basicamente una fila de la tabla
    y se pasaran tres props  
    */
    exerciseList() {
        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
      }

/*en el tbody va a llamar el método
this.exerciselist() que necesitamos implementar y va a retornar
las filas de la tabla */
/* en el thead: este es un estilo de bootstrap*/
    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}