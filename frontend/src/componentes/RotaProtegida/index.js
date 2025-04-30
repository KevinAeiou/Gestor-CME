import { Navigate, Outlet } from "react-router-dom";

function RotasProtegidas() {
    const token = sessionStorage.getItem('access_token');
    return token? <Outlet /> : <Navigate to= '/entrar' replace />
}

export default RotasProtegidas;