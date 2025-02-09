import { getPrismaClient } from "./signelton";

const prisma = getPrismaClient();

export interface GlobalCategoryInterface {
  name : string;
  slug? : string
}


export const createGlobalCategory = async (
  globalCategoryData: GlobalCategoryInterface
): Promise<{ status: boolean; data?: any; error?: string }> => {

  try {

    const res = await prisma.globalCategory.create({
      data: {
        name: globalCategoryData.name,
        slug: globalCategoryData?.slug
      },
      select: {
        id: true,
        name: true,
        slug: true,
        globalSubCategories: true
       }
    });

    return { status: true, data: res };

  } catch (error) {
    console.error("Error Creating Global Category:", error);
    return { status: false, error: "An error occurred while creating Global Category" };
  }
};


export const getAllGloalCategories = async() => {
  try {
    const res  = await prisma.globalCategory.findMany({
     select: {
      id: true,
      name: true,
      slug: true,
      globalSubCategories: true
     }
    })
    return { status: true, data: res};

  } catch(error) {
    console.error('Error fetching Global Categories:', error);
    return { status: false, error: 'Error fetching Global Categories' };
  }
} 


export const getGlobalCategoryByGlobalCategoryId = async(globalCategoryId: number) => {
  try {
    const response = await prisma.globalCategory.findFirst({
      where: {
        id: globalCategoryId
      },
      select: {
        id: true,
        name: true,
        slug: true,
        globalSubCategories: true
       } 
    })

    return { status: true, data: response};

  } catch(error) {
    console.error('Error Fetching Global Category:', error);
    return { status: false, error: 'Error fetching Global Categories' };
  }
}



interface GlobalCategoryUpdateInterface {
  id? : number,
  name?: string,
  slug?: string
}


export const updateGlobalCategoryforId = async(data: GlobalCategoryUpdateInterface, globalCategoryId: number) => {
  try {
    const response = await prisma.globalCategory.update({
      where: {
        id: globalCategoryId
      },
      data: {
        name: data?.name,
        slug: data?.slug
      }
    })

    return {status: true, data: response} ;

  } catch(error) {
    console.error('Error Updating Global Category:', error);
    return {status: false, error: error};
  }
}




export const deleteGlobalCategoryById = async(globalCategoryId: number) => {
  try {
    const response = await prisma.globalCategory.delete({
      where: {
        id: globalCategoryId
      }
    })

    return {status: true, data: response} ;

  } catch(error) {
    console.error('Error Deleting Global Category:', error);
    return {status: false, error: error};
  }
}
