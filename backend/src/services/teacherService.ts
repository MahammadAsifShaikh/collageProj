import Teacher from "../models/Teacher";

export const getAllTeachersService = async () => {
  return await Teacher.findAll();
};

export const getTeacherByIdService = async (id: number) => {
  return await Teacher.findByPk(id);
};

export const createTeacherService = async (data: any) => {
  return await Teacher.create(data);
};

export const updateTeacherService = async (id: number, data: any) => {
  const teacher = await Teacher.findByPk(id);
  if (!teacher) return null;
  return await teacher.update(data);
};

export const deleteTeacherService = async (id: number) => {
  const teacher = await Teacher.findByPk(id);
  if (!teacher) return null;
  await teacher.destroy();
  return true;
};
