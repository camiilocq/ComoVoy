import React, { useState, useEffect } from "react";
import axios from "../config/axios";

const AppContext = React.createContext();

export const AppContextWrapper = (props) => {
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

  const [selectionPage, setSelectionPage] = useState(1);
  const [showModalAddSemester, setShowModalAddSemester] = useState(false);
  const [showModalAddCourse, setShowModalAddCourse] = useState(false);
  const [showModalNotaMateria, setShowModalNotaMateria] = useState(false);
  const [restante, setRestante] = useState(0);
  const [notaParaGanar, setNotaParaGanar] = useState(0);
  const [semesters, setSemester] = useState(mainSemester);
  const [courses, setCousers] = useState(mainCourses);
  const [semesterSelect, setSemesterSelect] = useState("");
  const [courseSelect, setCourseSelect] = useState({});
  const [gradesSelected, setGradeSelected] = useState([]);

  useEffect(() => {
    axios.get("users").then((res) => console.log(res));
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const filterCoursesBySemester = (id) => {
    const semesterFilter = courses.filter(
      (course) => course.id_mongo_semester === id
    );
    return semesterFilter;
  };

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
    setGradeSelected(notasNuevas);
  };

  const deleteGrade = (id) => {
    const newGradeList = gradesSelected.filter(
      (grade) => grade.nombre_nota !== id
    );
    setGradeSelected(newGradeList);
  };

  const calcularPromedioSemestre = () => {
    /** 
    let promedioDef = 0;
    let sumaCreditos = 0;
    let sumaPonderado = 0;
    console.log(filterCoursesBySemester(semesterSelect));

    filterCoursesBySemester(semesterSelect).map((curso) => {
      sumaCreditos = curso.num_creditos + sumaCreditos;
      sumaPonderado = curso.definitiva * curso.num_creditos + sumaPonderado;
      //return null;
    });
    promedioDef = sumaPonderado / sumaCreditos;
    console.log(promedioDef);
    setSemesterSelect({
      ...semesterSelect,
      promedio: formatter.format(promedioDef),
    });

    //console.log(semesterSelect);
    */
  };

  const calcularNotaCurso = () => {
    let notaDef = 0;
    let porcentajeRestanteDef = 1;
    gradesSelected.map((grade) => {
      notaDef = grade.pocentaje * grade.calificacion + notaDef;
      porcentajeRestanteDef = porcentajeRestanteDef - grade.pocentaje;
      return null;
    });
    let notaNecesaria = (3 - notaDef) / porcentajeRestanteDef;
    setCourseSelect({
      ...courseSelect,
      definitiva: formatter.format(notaDef),
    });
    setRestante(porcentajeRestanteDef);
    setNotaParaGanar(formatter.format(notaNecesaria));
  };

  const state = {
    selectionPage,
    setSelectionPage,
    showModalAddSemester,
    setShowModalAddSemester,
    showModalAddCourse,
    setShowModalAddCourse,
    showModalNotaMateria,
    setShowModalNotaMateria,

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

    mainUser,

    filterCoursesBySemester,
    addSemester,
    addCourse,
    addNota,
    deleteGrade,
    calcularPromedioSemestre,
    calcularNotaCurso,
  };

  return (
    <AppContext.Provider value={state} displayName="AppContext">
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
