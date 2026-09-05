export interface ISoftSkills {
  id: number;
  name: JSON;
  description: JSON;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface responseSoftSkills {
  success: boolean;
  data: {
    softSkills: ISoftSkills[];
  };
}
