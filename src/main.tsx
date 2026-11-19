import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { detectAmazonRegion } from './amazonRegion';

// Start the US/UK check straight away so Amazon links are ready when shown.
detectAmazonRegion();

createRoot(document.getElementById('root')!).render(<App />);
