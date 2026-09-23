const API_URL = "http://localhost:3000/api";

const users = JSON.parse(localStorage.getItem("pokechat_users")) || [];

const saveUsers = () => {
  localStorage.setItem("pokechat_users", JSON.stringify(users));
};

const messages = JSON.parse(localStorage.getItem("pokechat_messages")) || [];

const saveMessages = () => {
  localStorage.setItem("pokechat_messages", JSON.stringify(messages));
};

export const signUp = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if user already exists
      if (users.some((u) => u.email === userData.email)) {
        reject({ message: "Email already registered" });
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveUsers();

      const { password, ...userWithoutPassword } = newUser;
      resolve(userWithoutPassword);
    }, 500);
  });
};

export const signIn = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((u) => u.email === email);

      if (!user) {
        reject({ message: "User not found" });
        return;
      }

      if (user.password !== password) {
        reject({ message: "Invalid password" });
        return;
      }

      const { password: _, ...userWithoutPassword } = user;
      resolve(userWithoutPassword);
    }, 500);
  });
};

export const updateProfile = async (userId, updatedData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = users.findIndex((u) => u.id === userId);

      if (userIndex === -1) {
        reject({ message: "User not found" });
        return;
      }

      if (updatedData.email && updatedData.email !== users[userIndex].email) {
        if (
          users.some((u) => u.email === updatedData.email && u.id !== userId)
        ) {
          reject({ message: "Email already in use" });
          return;
        }
      }

      users[userIndex] = { ...users[userIndex], ...updatedData };
      saveUsers();

      const { password, ...userWithoutPassword } = users[userIndex];
      resolve(userWithoutPassword);
    }, 500);
  });
};

export const changePassword = async (userId, currentPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((u) => u.id === userId);

      if (!user) {
        reject({ message: "User not found" });
        return;
      }

      if (user.password !== currentPassword) {
        reject({ message: "Current password is incorrect" });
        return;
      }

      user.password = newPassword;
      saveUsers();

      const { password, ...userWithoutPassword } = user;
      resolve(userWithoutPassword);
    }, 500);
  });
};

export const sendMessage = async (userId, userName, message, userAvatar) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMessage = {
        id: Date.now().toString(),
        userId,
        userName,
        message,
        userAvatar,
        timestamp: new Date().toISOString(),
      };

      messages.push(newMessage);
      saveMessages();
      resolve(newMessage);
    }, 100);
  });
};

export const getMessages = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(messages);
    }, 100);
  });
};

export const clearMessages = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      messages.length = 0;
      saveMessages();
      resolve(true);
    }, 100);
  });
};
