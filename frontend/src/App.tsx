import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import BrandGuidelines from './pages/BrandGuidelines';
import Colors from './pages/Colors';
import Typography from './pages/Typography';
import Components from './pages/Components';
import Spacing from './pages/Spacing';
import Patterns from './pages/Patterns';
import IntegrationGuide from './pages/IntegrationGuide';
import Icons from './pages/Icons';
import Loaders from './pages/Loaders';
import Templates from './pages/Templates';
import Examples from './pages/Examples';
import Playground from './pages/Playground';
import ThemeCustomizer from './pages/ThemeCustomizer';
import DevicePreview from './pages/DevicePreview';
import Utilities from './pages/Utilities';
import Documentation from './pages/Documentation';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/brand-guidelines" element={<BrandGuidelines />} />
          <Route path="/colors" element={<Colors />} />
          <Route path="/typography" element={<Typography />} />
          <Route path="/components" element={<Components />} />
          <Route path="/spacing" element={<Spacing />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/icons" element={<Icons />} />
          <Route path="/loaders" element={<Loaders />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/theme-customizer" element={<ThemeCustomizer />} />
          <Route path="/device-preview" element={<DevicePreview />} />
          <Route path="/utilities" element={<Utilities />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/integration-guide" element={<IntegrationGuide />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
