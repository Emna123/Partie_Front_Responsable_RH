import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

const AppProgress = (props) => {
  var color1 = '#4A235A';
  var color2 = "#EBDEF0";
  var p = 0;
 
 
  if (props.elm.langue != 0) {
    p = p + 20;
  }
  if (props.elm.hobby != 0) {
    p = p + 10;
  }
  if (props.elm.experience_prof != 0) {
    p = p + 20;
  }
  if (props.elm.competence != 0) {
    p = p + 20;
  }
  if (props.elm.formation != 0) {
    p = p + 20;
  }

  if (props.elm.linkedin != null) {
    p = p + 10;
  }
  if (p < 50) {
    color1 = '#B90221';
    color2 = '#E6B0AA';
  }
  else
    if (p >= 50 && p < 100) {
      color1 = '#229954';
      color2 = '#7DCEA0';

    }
    else {
      color1 = '#4A235A';
      color2 = '#EBDEF0';
    }



  return (
    <div style={{ width: '180%', height: '180%', minHeight: 18, minWidth: 55 }}>

      <CircularProgressbarWithChildren value={p} styles={{
        // Customize the root svg element
        root: {},
        // Customize the path, i.e. the "completed progress"
        path: {

          stroke: color1,
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',
          strokeWidth: '6%',
          padding: '-20%',
          // Customize transition animation
          transition: 'stroke-dashoffset 5s ease 0s',
        },
        // Customize the circle behind the path, i.e. the "total progress"
        trail: {
          // Trail color
          stroke: color2,
          strokeWidth: '4%'
        },
        // Customize the text

        // Customize background - only used when the `background` prop is true

      }}>
        <div style={{ backgroundImage: "url(" + props.imge + ")", backgroundSize: '100%', backgroundRepeat: 'no-repeat', borderRadius: '100%', width: '90%', height: '90%', backgroundPosition: 'center' }}>
        </div>

      </CircularProgressbarWithChildren>
      <div style={{ backgroundColor: color1, color: 'white', borderRadius: '25%', fontSize: "9px", paddingBottom: '2%', paddingTop: '2%', marginLeft: '36%', marginTop: '-3%', width: '33%', textAlign: 'center', whiteSpace: 'nowrap' }}>

        {p}%</div>

    </div>
  );
};
export default AppProgress;
