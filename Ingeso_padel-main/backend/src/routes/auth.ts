import express  from "express";
import { pool } from "../utils/db";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/jwt";

const router = express.Router();

router.post("/login", async (req,res) => {
    console.log("🛬 Se recibió POST /auth/login");
    console.log(req.body);
    const { email, password } = req.body

    const query = 'SELECT password FROM public."User" WHERE email = $1'
    const values = [email]

    try {
        const result = await pool.query(query, values)
        
        if(result.rowCount == 0){
            res.json({
                message: "Usuario no existente"
            });
            return;
        }

        const dbPassword = result.rows[0].password;

        console.log("🚀 DEBUG LOGIN:");
        console.log("👉 Email:", email);
        console.log("🔐 Password recibida:", password);
        console.log("📦 Hash en BD:", dbPassword);
        console.log("🧪 Longitud password:", password.length);
        console.log("🧪 Longitud hash:", dbPassword.length);
        
console.log("✅ bcrypt.compareSync:", bcrypt.compareSync(password, dbPassword));

        if(bcrypt.compareSync(password, dbPassword)) {
            
            const token = generateToken({ email });
            
            res.cookie('auth', token, {
                maxAge: 3600000,  
            });
            
            res.json({
                message: "Login Exitoso",
                token,
                email,
                role: "admin"
            });
            return 
        }

        res.json({
            message: "Credenciales Inválidas"
        });
        return

    } catch (error) {  
        console.log(error) 
        res.json({
            message: "Error de Petición"
        });
        return;
    }

});


export default router;

