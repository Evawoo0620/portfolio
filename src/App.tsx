import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SelectedWorks from './components/SelectedWorks';
import DesignProcess from './components/DesignProcess';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <main>
        <Hero />
        <About />
        <SelectedWorks />
        <DesignProcess />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
