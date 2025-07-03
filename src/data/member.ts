import { Member } from "@/types/member";

export const memberSample: Member = {
  id: "user_abc123",

  name: "John Doe",
  email: "john.doe@example.com",
  password: "hashed_password_123", // Placeholder: In a real app, this would be a hashed password.
  imagePath: null,

  createdAt: new Date("2024-01-01T00:00:00Z"),
  updatedAt: new Date("2025-07-03T10:40:00Z"),
};
