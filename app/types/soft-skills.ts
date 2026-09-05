export interface ISoftSkills {
  id: number;
  name: Record<string, string>;
  description: Record<string, string>;
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
