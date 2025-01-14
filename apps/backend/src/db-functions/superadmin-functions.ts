import { getPrismaClient } from "./signelton";

const prisma = getPrismaClient();

export interface SuperadminInference {
  email: string,
  password: string,
  name? : string,
}


export const createSuperadmin = async(superadminData: SuperadminInference) => {
  try {
    const response = await prisma.superadmin.create({
      data: {
        email: superadminData.email,
        password: superadminData.password,
        name: superadminData?.name
      },
    })

    return response;

  } catch(error) {
    console.error('Error creating Superadmin:', error);
    return error;
  }

}


export const getAllSuperadmin = async() => {
  try {
    const response  = await prisma.superadmin.findMany({
     select: {
      id: true,
      email: true,
      password: true,
      name: true,
      role: true,
      createdAt: true
     } 
    })
    return response;

  } catch(error) {
    console.error('Error fetching Superadmins:', error);
    return error;
  }
} 

export const getSuperadminByEmail = async(email: string) => {
  try {
    const response = await prisma.superadmin.findFirst({
      where: {
        email: email
      }
    })

    return response;

  } catch(error) {
    console.error('Error Finding Superadmins:', error);
    return error;
  }
}

export const getSuperadminById = async(id: number) => {
  try {
    const response = await prisma.superadmin.findFirst({
      where: {
        id: id
      }
    })

    return response;

  } catch(error) {
    console.error('Error Finding Superadmins:', error);
    return error;
  }
}

interface SuperAdminAdminUpdateInterface {
  id? : number,
  email?: string,
  password?: string
  name?: string,
}

export const updateSuperadmintforEmail = async(data: SuperAdminAdminUpdateInterface) => {
  try {
    const response = await prisma.superadmin.update({
      where: {
        email: data?.email
      },
      data: {
        password: data?.password,
        name: data?.name
      }
    })

    return response;

  } catch(error) {
    console.error('Error Updating Superadmin:', error);
    return error;
  }
}

export const updateSuperadmintforId = async(data: SuperAdminAdminUpdateInterface) => {
  try {
    const response = await prisma.superadmin.update({
      where: {
        id: data?.id
      },
      data: {
        email: data?.email,
        password: data?.password,
        name: data?.name
      }
    })

    return response;

  } catch(error) {
    console.error('Error Updating Superadmin:', error);
    return error;
  }
}


export const deleteSuperAdminById = async(id: number) => {
  try {
    const response = await prisma.superadmin.delete({
      where: {
        id: id
      }
    })

  } catch(error) {
    console.error('Error selecting Superadmin:', error);
    return error;
  }
}

export const deleteSuperAdminByEmail = async(email: string) => {
  try {
    const response = await prisma.superadmin.delete({
      where: {
        email: email
      }
    })

  } catch(error) {
    console.error('Error selecting Superadmin:', error);
    return error;
  }
}
