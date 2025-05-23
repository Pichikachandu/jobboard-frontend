import { JobsProvider } from './contexts/JobsContext';
import Routes from './Routes';

function App() {
  return (
    <JobsProvider>
      <Routes />
    </JobsProvider>
  );
}

export default App;