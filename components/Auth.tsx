import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget">
        <h1 className="header">Ejemplo de Supabase + Next.js</h1>
        <p className="description">
          Inicia sesión via `&quot`Magic Link`&quot` con tu correo electrónico.
        </p>
        <div>
          <input className="inputField" type="email" placeholder="Tu email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <button 
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="button block"
            disabled={loading}>
              <span>{loading ? 'Cargando' : 'Enviar Magic Link'}</span>
            </button>
        </div>
      </div>
    </div>
  )
}
