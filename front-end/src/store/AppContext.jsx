import React, { useState } from "react";
import axios from "../config/axios";

const AppContext = React.createContext();

export const AppContextWrapper = (props) => {
  const [selectionPage, setSelectionPage] = useState(1);
  const [showModalAddSemester, setShowModalAddSemester] = useState(false);
  const [showModalAddCourse, setShowModalAddCourse] = useState(false);
  const [showModalNotaMateria, setShowModalNotaMateria] = useState(false);
  const [showModalPromedioSemestre, setShowModalPromedioSemestre] =
    useState(false);
  const [showModalTerminosCondiciones, setModalTerminosCondiciones] =
    useState(false);
  const [restante, setRestante] = useState(0);
  const [notaParaGanar, setNotaParaGanar] = useState(0);
  const [user, setUser] = useState({});
  const [semesters, setSemester] = useState([]);
  const [courses, setCousers] = useState([]);
  const [semesterSelect, setSemesterSelect] = useState("");
  const [courseSelect, setCourseSelect] = useState({});
  const [gradesSelected, setGradeSelected] = useState([]);

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const addSemester = (newSemester) => {
    const semestersUpdated = [...semesters, newSemester];
    setSemester(semestersUpdated);
  };

  const addCourse = (newCourse) => {
    const coursesUpdated = [...courses, newCourse];
    setCousers(coursesUpdated);
  };

  const addNota = (newNota) => {
    const notasNuevas = [...gradesSelected, newNota];
    axios.put(
      "/users/" +
        user.id +
        "/semesters/" +
        semesterSelect +
        "/courses/" +
        courseSelect.id,
      {
        notas: notasNuevas,
      }
    );
    setGradeSelected(notasNuevas);
  };

  const deleteCourse = (id) => {
    const newCourseList = courses.filter((course) => course.id !== id);
    axios.delete(
      "/users/" + user.id + "/semesters/" + semesterSelect + "/courses/" + id
    );
    setCousers(newCourseList);
  };

  const deleteGrade = (id) => {
    const newGradeList = gradesSelected.filter((grade) => grade.nota !== id);
    axios.put(
      "/users/" +
        user.id +
        "/semesters/" +
        semesterSelect +
        "/courses/" +
        courseSelect.id,
      {
        notas: newGradeList,
      }
    );
    setGradeSelected(newGradeList);
  };

  const calcularPromedioSemestre = () => {
    let sumaCreditos = 0;
    let sumaPonderado = 0;

    courses.map((curso) => {
      sumaCreditos = sumaCreditos + curso.creditos;
      sumaPonderado = sumaPonderado + curso.creditos * curso.definitiva;
      return null;
    });
    const prom = formatter.format(sumaPonderado / sumaCreditos);
    if (semesterSelect !== "" && !showModalPromedioSemestre === false) {
      axios.put("/users/" + user.id + "/semesters/" + semesterSelect, {
        promedio: prom,
      });
    }
    return prom;
  };

  const calcularNotaCurso = () => {
    let notaDef = 0;
    let porcentajeRestanteDef = 1;
    gradesSelected.map((grade) => {
      notaDef = grade.porcentaje * grade.calificacion + notaDef;
      porcentajeRestanteDef = porcentajeRestanteDef - grade.porcentaje;
      return null;
    });
    let notaNecesaria = (3 - notaDef) / porcentajeRestanteDef;
    const superNota = formatter.format(notaDef);
    axios.put(
      "/users/" +
        user.id +
        "/semesters/" +
        semesterSelect +
        "/courses/" +
        courseSelect.id,
      {
        definitiva: superNota,
      }
    );
    setCourseSelect({
      ...courseSelect,
      definitiva: superNota,
    });
    setRestante(porcentajeRestanteDef);
    setNotaParaGanar(formatter.format(notaNecesaria));
    axios
      .get("/users/" + user.id + "/semesters/" + semesterSelect + "/courses")
      .then((res) => {
        setCousers(res.data);
      });
  };

  const calcularPromedioPonderado = () => {
    let sumaPromedios = 0;
    const numSemestres = semesters.length;
    semesters.map((semestre) => {
      sumaPromedios = sumaPromedios + semestre.promedio;
      return null;
    });
    const promedioPonderado = formatter.format(sumaPromedios / numSemestres);
    return promedioPonderado;
  };

  const arregloNombreDeSemestres = () => {
    const nombres = semesters.map((semestre) => {
      return {
        nombreSemestre: semestre.semestre,
        promedioSemestre: semestre.promedio,
      };
    });
    return nombres;
  };

  const arregloMateriasDelSemestre = () => {
    const materias = courses.map((curso) => {
      return {
        nombreMateria: curso.nombre,
        definitivaMateria: curso.definitiva,
      };
    });
    return materias;
  };

  const state = {
    user,
    setUser,

    selectionPage,
    setSelectionPage,
    showModalAddSemester,
    setShowModalAddSemester,
    showModalAddCourse,
    setShowModalAddCourse,
    showModalNotaMateria,
    setShowModalNotaMateria,
    showModalPromedioSemestre,
    setShowModalPromedioSemestre,
    showModalTerminosCondiciones,
    setModalTerminosCondiciones,

    restante,
    setRestante,
    notaParaGanar,
    setNotaParaGanar,

    semesterSelect,
    setSemesterSelect,
    courseSelect,
    setCourseSelect,
    semesters,
    setSemester,
    courses,
    setCousers,
    gradesSelected,
    setGradeSelected,

    addSemester,
    addCourse,
    addNota,
    deleteCourse,
    deleteGrade,
    calcularPromedioPonderado,
    calcularPromedioSemestre,
    calcularNotaCurso,
    arregloNombreDeSemestres,
    arregloMateriasDelSemestre,
  };

  return (
    <AppContext.Provider value={state} displayName="AppContext">
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
