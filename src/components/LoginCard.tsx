import { useState } from "react";

type LoginCardProps = {
  onLoginSuccess: (token: string) => void;
};

function LoginCard(props: LoginCardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError(""); 

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token)
            props.onLoginSuccess(data.token);
        } else {
            setLoginError("Invalid email or password");
        }
    } catch (error) {
        setLoginError("An error occurred while logging in");
    }
  };

  return (
    <div className="login-wrapper">
        <div className="login-card">
            <h2>Task Manager</h2>
            <p>Inicia sesión para acceder tus tareas</p>
        
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input 
                        type="email" 
                        placeholder="ejemplo@test.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
          
                <div className="form-group">
                    <label>Contraseña</label>
                    <input 
                        type="input" 
                        placeholder="******" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {loginError && <p className="error-message">{loginError}</p>}

                <button type="submit" className="login-btn">Ingresar</button>
            </form>
        </div>
    </div>
    );    

}

export default LoginCard;