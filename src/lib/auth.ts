import { SignJWT, jwtVerify } from "jose";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

const getCookieValue = (name: string) => {
  let value = `; ${document.cookie}`;
  let parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts?.pop()?.split(";").shift();
};

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  // Verify credentials && get the user
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  try {
    // In a real app, you would verify against a database
    // This is just a simple example with hardcoded users
    const users = [
      { email: "user@example.com", password: "password", name: "John", role: "user" },
      { email: "admin@example.com", password: "adminpass", name: "Admin", role: "admin" }
    ];
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { success: false, error: "Invalid credentials" };
    }

    // Create the session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await encrypt({ 
      user: { 
        email: user.email, 
        name: user.name,
        role: user.role 
      }, 
      expires 
    });

    // Save the session in a cookie
    document.cookie = `session=${session}; expires=${expires.toUTCString()}; path=/;`;
    return { success: true, user: { email: user.email, name: user.name, role: user.role } };
  } catch (error) {
    console.error(error);
    return { success: false, error: "An error occurred during login" };
  }
}

export async function logout() {
  try {
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function getSession() {
  const session = getCookieValue("session");
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession() {
  const session = getCookieValue("session");
  if (!session) return;

  // Refresh the session so it doesn't expire
  try {
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    document.cookie = `session=${await encrypt(
      parsed
    )}; expires=${parsed.expires.toUTCString()}; path=/;`;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Add a function to check if user is admin
export async function isAdmin() {
  const session = await getSession();
  if (!session || !session.user) return false;
  return session.user.role === 'admin';
}

// Add a function to protect admin routes
export async function requireAdmin() {
  const isUserAdmin = await isAdmin();
  if (!isUserAdmin) {
    // Redirect to login or unauthorized page
    window.location.href = '/login?unauthorized=true';
    return false;
  }
  return true;
}
