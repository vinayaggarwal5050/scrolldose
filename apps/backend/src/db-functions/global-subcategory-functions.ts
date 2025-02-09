import { getPrismaClient } from "./signelton";

const prisma = getPrismaClient();

export interface GlobalSubCategoryInterface {
  name : string,
  slug? : string,
}


export const createGlobalSubCategory = async (data: GlobalSubCategoryInterface, globalCategoryId: number) => {

  try {

    const res = await prisma.globalSubCategory.create({
      data: {
        name: data.name,
        slug: data?.slug,
        globalCategory: {
          connect: {
            id: globalCategoryId
          }
        }
      },
      select: {
        id: true,
        name: true,
        slug: true,
        globalCategoryId: true
       }
    });

    return { status: true, data: res };

  } catch (error) {
    console.error("Error Creating Global Sub Category:", error);
    return { status: false, error: "An error occurred while creating Global Sub Category" };
  }
};


export const getAllGlobalSubCategories = async() => {
  try {
    const res  = await prisma.globalSubCategory.findMany({
     select: {
      id: true,
      name: true,
      slug: true,
      globalCategoryId: true
     }
    })
    return { status: true, data: res};

  } catch(error) {
    console.error('Error fetching Global Sub Categories:', error);
    return { status: false, error: 'Error fetching Global Sub Categories' };
  }
} 


export const getGlobalSubCategoryByGlobalSubCategoryId = async(globalSubCategoryId: number) => {
  try {
    const response = await prisma.globalSubCategory.findFirst({
      where: {
        id: globalSubCategoryId
      },
      select: {
        id: true,
        name: true,
        slug: true,
        globalCategoryId: true
       } 
    })

    return { status: true, data: response};

  } catch(error) {
    console.error('Error Fetching Global Sub Category:', error);
    return { status: false, error: 'Error fetching Global Sub Category' };
  }
}

export const getGlobalSubCategoryForGlobalCategoryId = async(globalCategoryId: number) => {
  try {
    const response = await prisma.globalSubCategory.findMany({
      where: {
        globalCategoryId: globalCategoryId
      },
      select: {
        id: true,
        name: true,
        slug: true,
        globalCategoryId: true
       } 
    })

    return { status: true, data: response};

  } catch(error) {
    console.error('Error Fetching Global Sub Category:', error);
    return { status: false, error: 'Error fetching Global Sub Category' };
  }
}


interface GlobalSubCategoryUpdateInterface {
  id? : number,
  name?: string,
  slug?: string
}


export const updateGlobalSubCategoryforId = async(data: GlobalSubCategoryUpdateInterface, globalSubCategoryId: number) => {
  try {
    const response = await prisma.globalSubCategory.update({
      where: {
        id: globalSubCategoryId
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

export const deleteGlobalSubCategoryById = async(globalSubCategoryId: number) => {
  try {
    const response = await prisma.globalSubCategory.delete({
      where: {
        id: globalSubCategoryId
      }
    })

    return {status: true, data: response} ;

  } catch(error) {
    console.error('Error Deleting Global Sub Category:', error);
    return {status: false, error: error};
  }
}


