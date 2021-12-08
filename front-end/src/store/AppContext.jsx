import React, { useState } from "react";
import axios from "../config/axios";

const AppContext = React.createContext();

export const AppContextWrapper = (props) => {
  /*
  const mainUser = {
    id_mongo: "u1",
    nombre_completo: "Juan Puerta",
    correo: "juan@gmail.com",
    promedio_ponderado: 0,
    contraseña: "juan123",
    institucion: "ICESI University",
  };

  const mainSemester = [
    {
      id_mongo: "s1",
      nombre_semestre: "2021-02",
      promedio: 0,
      id_mongo_user: "u1",
    },
    {
      id_mongo: "s2",
      nombre_semestre: "2022-01",
      promedio: 0,
      id_mongo_user: "u1",
    },
  ];

  const mainCourses = [
    {
      id_mongo: "n1",
      nombre_materia: "Álgebra lineal",
      num_creditos: 3,
      notas: [
        {
          nombre_nota: "Laboratorios",
          pocentaje: 0.2,
          calificacion: 4,
        },
        {
          nombre_nota: "Proyecto final",
          pocentaje: 0.4,
          calificacion: 4.5,
        },
      ],
      id_mongo_semester: "s1",
      definitiva: 0,
    },
    {
      id_mongo: "n2",
      nombre_materia: "COE I",
      num_creditos: 2,
      notas: [
        {
          nombre_nota: "Escrito I",
          pocentaje: 0.3,
          calificacion: 3.7,
        },
      ],
      id_mongo_semester: "s1",
      definitiva: 0,
    },
    {
      id_mongo: "n3",
      nombre_materia: "Matemáticas discretas",
      num_creditos: 4,
      notas: [],
      id_mongo_semester: "s2",
      definitiva: 0,
    },
  ];
*/
  const [selectionPage, setSelectionPage] = useState(1);
  const [showModalAddSemester, setShowModalAddSemester] = useState(false);
  const [showModalAddCourse, setShowModalAddCourse] = useState(false);
  const [showModalNotaMateria, setShowModalNotaMateria] = useState(false);
  const [showModalPromedioSemestre, setShowModalPromedioSemestre] =
    useState(false);
  const [restante, setRestante] = useState(0);
  const [notaParaGanar, setNotaParaGanar] = useState(0);
  //const [promedioPonderado, setPromedioPonderado] = useState(0);
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

    restante,
    setRestante,
    notaParaGanar,
    setNotaParaGanar,
    //promedioPonderado,
    //setPromedioPonderado,

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
    // arregloNotasSemestres,
  };

  return (
    <AppContext.Provider value={state} displayName="AppContext">
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
