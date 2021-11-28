import React from "react";
//import Alerta from "../../components/Alerta/Alerta";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import "./SignUp.css";

const SignUp = () => {
  const history = useHistory();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  //const [correctEmail, setCorrectEmail] = React.useState(false);
  //const [error, setError] = React.useState(false);

  return (
    <div className="signUp">
      <Card className="carDispo" sx={{ minWidth: 275 }}>
        <CardContent className="carConten">
          <div className="cabeseraSignUp">
            <div>ComoVoy</div>
            <div>Registrarse</div>
          </div>
          <hr />
          <div className="formContainer">
            <div>Nombre completo</div>
            <TextField
              required
              label="Nombre"
              variant="filled"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <p />
            <div>Correo electronico</div>
            <TextField
              required
              label="Correo"
              variant="filled"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <p />
            <div>Contraseña</div>
            <TextField
              required
              id="filled-password-input"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              variant="filled"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <p />
            <div className="divBotones">
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <Button variant="contained">Ingresar</Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Cancelar
                </Button>
              </Stack>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
