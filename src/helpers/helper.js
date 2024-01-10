import axios from "axios";
import {jwtDecode} from "jwt-decode";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

// get username from token
export function getUsernameFromToken() {
  
  const token = localStorage.getItem("token");
  
  if(!token){
    // console.log("token not found")
    return null
  }

  let decode = jwtDecode(token);
  return decode;
}

// authnticate user
export async function authenticate(emailOrUsername) {
  try {
    const response = await axios.post("/api/authenticate", { emailOrUsername });
    return response; // Returning the full response object for better error handling
  } catch (error) {
    console.error("Error during authentication:", error);
    return { error: "Username doesn't exist...!" };
  }
}

// get user
export async function getUser({ emailOrUsername }) {
  try {
    const { data } = await axios.get(`/api/user/${emailOrUsername}`);
    return data;
  } catch (error) {
    return { error: "User not exist..." };
  }
}

// signup user
export async function signup(credentials) {
  try {
    const {
      data: { message },
      status,
    } = await axios.post("/api/signup", credentials);

    const username = credentials.get("username");
    const email = credentials.get("email");
  
    // send the email
    if (status === 201) {
      await axios.post("/api/signupMail", {
        username,
        userEmail: email,
        text: message,
        subject: "Welcome to CodeBox!",
      });
    }

    return Promise.resolve(message);
  } catch (error) {
    return Promise.reject({ error });
  }
}

// login user
export async function login({emailOrUsername, password}) {
  try {

    if (emailOrUsername) {
      const { data } = await axios.post("/api/login", {
        emailOrUsername,
        password,
      });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Invalid Credentials" });
  }
}

//update user profile
export async function updateUser(response) {
  try {
    const token = localStorage.getItem("token");
    const id = response.get("id")
    const file = response.get("profile")
    const data = await axios.patch(`/api/updateUser?id=${id}`, response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't update the user profile" });
  }
}

//generate OTP
export async function generateOTP(emailOrUsername){
  try {
      const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { emailOrUsername }});

      // send mail with the OTP
      if(status === 201){
          const data= await getUser({ emailOrUsername });
          let text = `Your Password Recovery OTP is <b>${code}</b>. Verify and recover your password.`;
          await axios.post('/api/signupMail', { username:data.others.username, userEmail: data.others.email, text, subject : "Password Recovery OTP"})
      }
      return Promise.resolve(code);
  } catch (error) {
      return Promise.reject({ error });
  }
}

//verify OTP
export async function verifyOTP({ emailOrUsername, code }) {
  try {
    const { data, status } = await axios.get(`/api/verifyOTP`, {
      params: { emailOrUsername, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject({ error });
  }
}

//reset password
export async function resetPassword({ emailOrUsername, password }) {
  try {
    const { data, status } = await axios.patch(`/api/resetPassword`, {
      emailOrUsername,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function getAllUsers() {
  try {
    const { data } = await axios.get("/api/getAllUsers");
    return data;
  } catch (error) {
    return { error: "User not exist..." };
  }
}
//delete user
export async function deleteUser(id) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.patch(`/api/deleteUser?id=${id}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    return { error: "User not exist..." };
  }
}

export async function getUserCount() {
  try {
    const { data } = await axios.get("/api/getUsersCount");
    return data;
  } catch (error) {
    return { error: "User not exist..." };
  }
}

export async function getUserById(id) {
  try {
    const { data } = await axios.get(`/api/getUserById/${id}`);
    return data;
  } catch (error) {
    return { error: "User not exist..." };
  }
}
