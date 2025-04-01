import Principal from "../models/Principal";

export const getAllPrincipalsService = async () => {
  return await Principal.findAll();
};

export const getPrincipalByIdService = async (id: number) => {
  return await Principal.findByPk(id);
};

export const createPrincipalService = async (data: any) => {
  return await Principal.create(data);
};

export const updatePrincipalService = async (id: number, data: any) => {
  const principal = await Principal.findByPk(id);
  if (!principal) return null;
  return await principal.update(data);
};

export const deletePrincipalService = async (id: number) => {
  const principal = await Principal.findByPk(id);
  if (!principal) return null;
  await principal.destroy();
  return true;
};
