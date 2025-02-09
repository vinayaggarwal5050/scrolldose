import { getPrismaClient } from "./signelton";

const prisma = getPrismaClient();

export interface CategoryInterface {
  name: string,
  slug?: string,
}


export const createCategoryForStoreId = async(categoryData: CategoryInterface, storeId: number) => {
  try {
    const response = await prisma.category.create({
      data: {
        name: categoryData.name,
        slug: categoryData?.slug,
        store: {
          connect: {
            id: storeId
          }
        }
      },
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error creating Category:', error);
    return { status: false, error: error };
  }

}

export const getAllCategories = async() => {
  try {
    const response  = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        storeId: true
      }
    });

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Fetching Categories:', error);
    return { status: false, error: error };
  }
}

export const getCategoryByCategoryId = async(categoryId: number) => {
  try {
    const response = await prisma.category.findFirst({
      where: {
        id: categoryId
      },
      select: {
        id: true,
        name: true,
        slug: true,
        storeId: true
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Finding Category:', error);
    return { status: false, error: error };
  }
}

export const getCategoryByStoreId = async(storeId: number) => {
  try {
    const response = await prisma.category.findMany({
      where: {
        storeId: storeId
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Finding Category:', error);
    return { status: false, error: error };
  }
}

export const getCategoriesByChannelPartnerId = async(channelPartnerId: number) => {
  try {
    const store = await prisma.store.findFirst({
      where: {
        channelPartnerId: channelPartnerId
      }
    })

    if(!store) {
      return "no store exists for this channel partner id"
    }
    
    const response = await prisma.category.findMany({
      where: {
        storeId: store.id
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Finding products:', error);
    return { status: false, error: error };
  }
}

interface updateCategoryInterface {
  name: string,
  slug?: string,
}

export const updateCategoryByCategoryId = async(data: updateCategoryInterface, categoryId: number) => {
  try {
    const response = await prisma.category.update({
      where: {
        id: categoryId
      },
      data: {
        name: data?.name,
        slug: data?.slug,
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Updaing Category:', error);
    return { status: false, error: error };
  }

}

export const deleteCategoryByCategoryId = async(categoryId: number) => {
  try {
    const response = await prisma.product.delete({
      where: {
        id: categoryId
      }
    })

  return { status: true, data: response };

  } catch(error) {
    console.error('Error Deleting Category:', error);
    return { status: false, error: error };
  }
}

