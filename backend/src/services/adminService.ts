import Admin from "../models/Admin";

export const getAllAdminsService = async () => {
  return await Admin.findAll();
};

export const getAdminByIdService = async (id: number) => {
  return await Admin.findByPk(id);
};

export const createAdminService = async (data: any) => {
  return await Admin.create(data);
};

export const updateAdminService = async (id: number, data: any) => {
  const admin = await Admin.findByPk(id);
  if (!admin) return null;
  return await admin.update(data);
};

export const deleteAdminService = async (id: number) => {
  const admin = await Admin.findByPk(id);
  if (!admin) return null;
  await admin.destroy();
  return true;
};
