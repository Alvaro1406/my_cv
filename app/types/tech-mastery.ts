export interface ITechnicalMastery {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface responseTechMastery {
  success: boolean;
  data: {
    techMastery: ITechnicalMastery[];
  };
}
