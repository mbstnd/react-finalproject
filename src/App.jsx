import './App.css'

import Header from './components/Header.jsx'
import MiApi from './components/MiApi.jsx'
import Footer from './components/Footer.jsx'


function App() {
  

  return (
    <div className="App">
      <Header className = 'app-header'>
      </Header>
      <main> 
        <MiApi></MiApi>
        <Footer></Footer>
      </main>
    </div>
  )
}

export default App;
