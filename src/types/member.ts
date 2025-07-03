export interface Member {
  id: string;

  name: string;
  email: string;
  password: string;
  imagePath: string | null;

  createdAt: Date;
  updatedAt: Date;
}
