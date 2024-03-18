import { Container, Typography } from "@mui/material";
import "./styles.css";

const ErrorCP = ({ message }: { message: string }) => (
  <Container className="error-container">
    <Typography variant="h4" gutterBottom align={"center"}>
      {message}
    </Typography>
  </Container>
);

export default ErrorCP;
