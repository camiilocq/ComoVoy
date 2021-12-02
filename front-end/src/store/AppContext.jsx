import React, { useState } from "react";

const AppContext = React.createContext();

export const AppContextWrapper = (props) => {
  const mainUser = {
    id_mongo: "u1",
    nombre_completo: "Juan Puerta",
    correo: "juan@gmail.com",
    contraseña: "juan123",
    institucion: "ICESI University",
  };

  const mainSemester = [
    { id_mongo: "s1", nombre_semestre: "2021-02", id_mongo_user: "u1" },
    { id_mongo: "s2", nombre_semestre: "2022-01", id_mongo_user: "u1" },
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
    },
    {
      id_mongo: "n3",
      nombre_materia: "Matemáticas discretas",
      num_creditos: 4,
      notas: [],
      id_mongo_semester: "s2",
    },
  ];

  const [selectionPage, setSelectionPage] = useState(1);
  const [showModalAddSemester, setShowModalAddSemester] = useState(false);
  const [showModalAddCourse, setShowModalAddCourse] = useState(false);
  const [semesters, setSemester] = useState(mainSemester);
  const [courses, setCousers] = useState(mainCourses);
  const [semesterSelect, setSemesterSelect] = useState("");
  const [courseSelect, setCourseSelect] = useState({});
  const [gradesSelected, setGradeSelected] = useState([]);

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

  const state = {
    selectionPage,
    setSelectionPage,
    showModalAddSemester,
    setShowModalAddSemester,
    showModalAddCourse,
    setShowModalAddCourse,
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
  };

  return (
    <AppContext.Provider value={state} displayName="AppContext">
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
