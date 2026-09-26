
export function createDefaultAdmin() {
  const existingUser = localStorage.getItem("user");

  // إذا يوجد مستخدم، لا ننشئ Admin جديد
  if (existingUser) {
    return;
  }

  const admin = {
    id: crypto.randomUUID(),
    username: "Admin",
    email: "admin@myblog.com",
    password: "Admin123",
    role: "admin",
  };

  localStorage.setItem("user", JSON.stringify(admin));

  console.log("Default admin account created");
}

