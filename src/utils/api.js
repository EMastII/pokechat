const users = JSON.parse(localStorage.getItem("pokechat_users")) || [];

const saveUsers = () => {
  localStorage.setItem("pokechat_users", JSON.stringify(users));
};

const messages = JSON.parse(localStorage.getItem("pokechat_messages")) || [];

const saveMessages = () => {
  localStorage.setItem("pokechat_messages", JSON.stringify(messages));
};

const seedMockMessages = () => {
  if (messages.length > 0) {
    return;
  }

  const now = Date.now();
  const seededMessages = [
    {
      id: "seed-1",
      userId: "bot-1",
      userName: "Professor Oak",
      userAvatar:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      message:
        "Welcome to PokéChat! Ash, Misty, and Brock are already discussing today’s training plan.",
      timestamp: new Date(now - 1000 * 60 * 65).toISOString(),
    },
    {
      id: "seed-2",
      userId: "bot-2",
      userName: "Misty",
      userAvatar:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
      message:
        "I’ve already set up the route check for the afternoon. Who is ready for a battle?",
      timestamp: new Date(now - 1000 * 60 * 42).toISOString(),
    },
    {
      id: "seed-3",
      userId: "bot-3",
      userName: "Brock",
      userAvatar:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png",
      message:
        "Let’s keep the team focused and make sure everyone is stocked up before the next gym challenge.",
      timestamp: new Date(now - 1000 * 60 * 10).toISOString(),
    },
  ];

  messages.push(...seededMessages);
  saveMessages();
};

export const signUp = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
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

      const { password: _password, ...userWithoutPassword } = newUser;
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

      const { password: _password, ...userWithoutPassword } = user;
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

      const { password: _password, ...userWithoutPassword } = users[userIndex];
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

      const { password: _password, ...userWithoutPassword } = user;
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

      const autoReply = {
        id: `${Date.now()}-reply`,
        userId: "pokechat-bot",
        userName: "Pikachu",
        message: `Got it, ${userName}! I’ll keep the team updated on the next move.`,
        userAvatar:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        timestamp: new Date().toISOString(),
      };

      messages.push(autoReply);
      saveMessages();
      resolve(newMessage);
    }, 100);
  });
};

export const getMessages = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      seedMockMessages();
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
