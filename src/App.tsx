import { appRouter } from "./routes";
import {BrowserRouter} from 'react-router-dom';


function App() {
  const routes = appRouter();

  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  )
}

export default App
