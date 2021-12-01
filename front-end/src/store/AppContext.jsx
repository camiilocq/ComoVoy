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
      notas: [],
      id_mongo_semester: "s1",
    },
    {
      id_mongo: "n2",
      nombre_materia: "COE I",
      num_creditos: 2,
      notas: [],
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
  const [semesters, setSemester] = useState(mainSemester);
  const [courses, setCousers] = useState(mainCourses);
  const [semesterSelect, setSemesterSelect] = useState("");

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

  const state = {
    selectionPage,
    setSelectionPage,
    showModalAddSemester,
    setShowModalAddSemester,
    semesterSelect,
    setSemesterSelect,
    semesters,
    setSemester,
    courses,
    setCousers,

    mainUser,

    filterCoursesBySemester,
    addSemester,
  };

  return (
    <AppContext.Provider value={state} displayName="AppContext">
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
