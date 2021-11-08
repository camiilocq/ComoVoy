import React from "react";
//import Alerta from "../../components/Alerta/Alerta";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Login.css";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //const [error, setError] = React.useState(false);

  return (
    <div className="login">
      <Card className="carDispo" sx={{ minWidth: 275 }}>
        <CardContent className="carConten">
          <div className="cabeseraLogin">
            <div>ComoVoy</div>
            <div>Login</div>
          </div>
          <hr />
          <div className="formContainer">
            <div>Email</div>
            <TextField
              id="filled-required"
              label="Email"
              variant="filled"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <p />
            <div>Contraseña</div>
            <TextField
              id="filled-password-input"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              variant="filled"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <p />
            <div>
              <Button variant="contained">Ingresar</Button>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              history.push("/sign-up");
            }}
          >
            Registrarse
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Login;
