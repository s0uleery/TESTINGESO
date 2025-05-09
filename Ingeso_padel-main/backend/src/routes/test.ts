import bcrypt from 'bcryptjs';

const plainPassword = "123456";

// Generar un nuevo hash
const newHash = bcrypt.hashSync(plainPassword, 10);
console.log("🔐 Nuevo hash generado:", newHash);

// Comprobar que funciona
console.log("✅ Comparación:", bcrypt.compareSync(plainPassword, newHash));
