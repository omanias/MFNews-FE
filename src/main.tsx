import '@ant-design/v5-patch-for-react-19';
import { unstableSetRender } from 'antd';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './config/vite-env'  // Import Vite environment configuration
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

unstableSetRender((node, container) => {
  const typedContainer = container as Element & { _reactRoot?: ReturnType<typeof createRoot> };
  typedContainer._reactRoot ||= createRoot(typedContainer);
  const root = typedContainer._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});
