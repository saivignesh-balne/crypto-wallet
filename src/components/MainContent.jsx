import Features from './Features';
import Hero from './Hero';

const MainContent = () => {
  return (
    <main className="flex-grow">
      <Hero />
      <Features />
    </main>
  );
};

export default MainContent;