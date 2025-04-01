import Student from "../models/Student";

// ✅ Get all students
export const getAllStudentsService = async () => {
  return await Student.findAll();
};

// ✅ Get student by ID
export const getStudentByIdService = async (id: number) => {
  return await Student.findByPk(id);
};

// ✅ Create a student
export const createStudentService = async (data: any) => {
  return await Student.create(data);
};

// ✅ Update a student
export const updateStudentService = async (id: number, data: any) => {
  const student = await Student.findByPk(id);
  if (!student) return null;

  await student.update(data);
  return student;
};

// ✅ Delete a student
export const deleteStudentService = async (id: number) => {
  const student = await Student.findByPk(id);
  if (!student) return false;

  await student.destroy();
  return true;
};
