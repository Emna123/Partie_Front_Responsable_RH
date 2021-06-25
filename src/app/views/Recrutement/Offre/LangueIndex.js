export const  suggestions = [
  { label: "Connaissance passive" },
  { label: "Connaissance orale de base" },
  { label: "Capacité conversationnelle" },
  { label: "S'exprime couramment" },
  { label: "Langue maternelle" },

];



  export function indiceniveaulangue(niveau) {
      var l=-1;
   for(var i=0; i<suggestions.length;i++)
   {
        if(suggestions[i].label===niveau){
          l=i
       }
   }

 return l;

  }
    