// import React, { useEffect, useRef, useState } from 'react';
// import ring from '../assets/ring.mp3';

// const Call = () => {
//   const ringtoneRef = useRef(null);

//   useEffect(() => {
//     // Function to handle permission and play the ringtone
//     const handlePermission = () => {
//       navigator.mediaDevices.getUserMedia({ audio: true })
//         .then(stream => {
//           console.log('User has granted permission');
//           if (ringtoneRef.current) {
//             ringtoneRef.current.play();
//           }
//         })
//         .catch(error => {
//           console.error('Error accessing microphone:', error);
//         });
//     };

//     // Check for permission when component mounts
//     handlePermission();
//   }, []);

//   return (
//     <div className="calling-box">
//       <audio ref={ringtoneRef} id="ringtone" loop src={ring}></audio>
//     </div>
//   );
// };

// export default Call;

import React, { useEffect, useRef, useState } from 'react';
import ring from '../assets/ring.mp3';

const useMicrophonePermission = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handlePermission = () => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          setHasPermission(true);
        })
        .catch(error => {
          setError(error);
        });
    };

    handlePermission();
  }, []);

  return { hasPermission, error };
};

const Call = () => {
  const ringtoneRef = useRef(null);
  const { hasPermission, error } = useMicrophonePermission();

  useEffect(() => {
    if (hasPermission && ringtoneRef.current) {
      ringtoneRef.current.play();
    }
  }, [hasPermission]);

  if (error) {
    return <div>Error accessing microphone: {error.message}</div>;
  }

  return (
    <div className="calling-box">
      <audio ref={ringtoneRef} id="ringtone" loop src={ring}></audio>
    </div>
  );
};

export default Call;
