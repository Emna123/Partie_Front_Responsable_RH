import React from "react";

const recrutementRoute = [
  {
    path: "/recrutement/condidats",
    component: React.lazy(() => import("./Candidature/AppCandidats"))
  },
  {
    path: "/recrutement/profilecondidat/:id",
    component: React.lazy(() => import("./Candidat/AppProfileCondidat"))
  },
  {
    path: "/recrutement/ModifierOffre/:id",
    component: React.lazy(() => import("./Offre/ModifRecrutement"))
  },
  {
    path: "/recrutement/offres",
    component: React.lazy(() => import("./Offre/AppRecrutement"))
  }
  ,
  {
    path: "/recrutement/toutescandidats",
    component: React.lazy(() => import("./Candidat/AppToutesCandidats"))
  }
  ,
  {
    path: "/recrutement/Offre/AddRecrutement",
    component: React.lazy(() => import("./Offre/AddRecrutement"))
  }
  ,
  {
    path: "/recrutement/Examen/:id",
    component: React.lazy(() => import("./Examen/Examen"))
  }
  ,
  {
    path: "/recrutement/EditExamen/:id",
    component: React.lazy(() => import("./Examen/EditExamen"))
  }
];
export default recrutementRoute;
