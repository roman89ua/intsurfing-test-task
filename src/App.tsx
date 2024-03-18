import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { AppRouterProvider } from "./router.tsx";
import { Container } from "@mui/material";

function App() {
  return (
    <Container className="main-container">
      <AppRouterProvider />
    </Container>
  );
}

export default App;
