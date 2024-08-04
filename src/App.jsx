import './App.css'
import { Outlet } from 'react-router-dom'
import LinkInfoProvider from './Store/Context'


function App() {

  return (
    <div className='app-container'>
      <LinkInfoProvider>
        <Outlet />
      </LinkInfoProvider>
    </div>
  )
}


export default App
