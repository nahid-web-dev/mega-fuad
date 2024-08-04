// import React, { useEffect, useState } from 'react';
// import ring from '../assets/ring.mp3';

// const Call = () => {
//   const [hasPermission, setHasPermission] = useState(false);

//   useEffect(() => {

//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .then(stream => {
//         const ringtone = document.getElementById('ringtone')
//         console.log('User has granted permission');
//         ringtone.play();
//         setHasPermission(true);
//       })
//       .catch(error => {
//         console.error('Error accessing microphone:', error);
//       });
//   }, []);

//   return (
//     <div className="calling-box">
//       <audio id="ringtone" loop src={ring}></audio>
//     </div>
//   );
// };

// export default Call;


import React, { useEffect, useRef, useState } from 'react';
import ring from '../assets/ring.mp3';

const Call = () => {
  const ringtoneRef = useRef(null);

  useEffect(() => {
    // Function to handle permission and play the ringtone
    const handlePermission = () => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          console.log('User has granted permission');
          if (ringtoneRef.current) {
            ringtoneRef.current.play();
          }
        })
        .catch(error => {
          console.error('Error accessing microphone:', error);
        });
    };

    // Check for permission when component mounts
    handlePermission();
  }, []);

  return (
    <div className="calling-box">
      <audio ref={ringtoneRef} id="ringtone" loop src={ring}></audio>
    </div>
  );
};

export default Call;
