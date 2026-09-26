const USERS_KEY = "users";
const SESSION_KEY = "session";

export const AUTH_EVENT = "auth-change";

// =========================
// Users
// =========================

export function getUsers() {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// =========================
// Current User
// =========================

export function getCurrentUser() {
  const session = localStorage.getItem(SESSION_KEY);

  if (!session) {
    return null;
  }

  try {
    const parsedSession = JSON.parse(session);
    const users = getUsers();

    return (
      users.find(
        (user) => user.id === parsedSession.userId
      ) || null
    );
  } catch {
    return null;
  }
}

// =========================
// Authentication event
// =========================

function notifyAuthChange() {
  window.dispatchEvent(new Event(AUTH_EVENT));
}

// =========================
// Login
// =========================

export function loginUser(email, password) {
  const users = getUsers();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() ===
        email.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return null;
  }

  const token = crypto.randomUUID();

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      token,
      userId: user.id,
    })
  );

  notifyAuthChange();

  return user;
}

// =========================
// Register
// =========================

export function registerUser({
  username,
  email,
  password,
}) {
  const users = getUsers();

  const emailExists = users.some(
    (user) =>
      user.email.toLowerCase() ===
      email.toLowerCase()
  );

  if (emailExists) {
    return {
      user: null,
      error: "email_exists",
    };
  }

  const newUser = {
    id: crypto.randomUUID(),
    username,
    email,
    password,

    // مهم جدًا:
    // المستخدم لا يستطيع إنشاء Admin
    role: "user",

    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  saveUsers(users);

  return {
    user: newUser,
    error: null,
  };
}

// =========================
// Logout
// =========================

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);

  notifyAuthChange();
}

// =========================
// Auth status
// =========================

export function isAuthenticated() {
  return Boolean(getCurrentUser());
}

// =========================
// Default Admin
// =========================

export function createDefaultAdmin() {
  const users = getUsers();

  const adminExists = users.some(
    (user) =>
      user.email.toLowerCase() ===
      "admin@myblog.com"
  );

  if (adminExists) {
    return;
  }

  const admin = {
    id: crypto.randomUUID(),
    username: "Admin",
    email: "admin@myblog.com",
    password: "Admin123",
    role: "admin",
    createdAt: new Date().toISOString(),
  };

  users.push(admin);

  saveUsers(users);
}

// =========================
// Migration from old version
// =========================

export function migrateLegacyAuth() {
  const oldUser = localStorage.getItem("user");

  if (!oldUser) {
    return;
  }

  try {
    const parsedOldUser = JSON.parse(oldUser);

    const users = getUsers();

    const existingUser = users.find(
      (user) =>
        user.email?.toLowerCase() ===
        parsedOldUser.email?.toLowerCase()
    );

    let migratedUser = existingUser;

    if (!existingUser) {
      migratedUser = {
        id:
          parsedOldUser.id ||
          crypto.randomUUID(),

        username:
          parsedOldUser.username ||
          "User",

        email:
          parsedOldUser.email || "",

        password:
          parsedOldUser.password || "",

        role:
          parsedOldUser.role || "user",

        createdAt: new Date().toISOString(),
      };

      users.push(migratedUser);
      saveUsers(users);
    }

    const oldToken =
      localStorage.getItem("token");

    if (
      oldToken &&
      migratedUser?.id
    ) {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          token: oldToken,
          userId: migratedUser.id,
        })
      );
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
}