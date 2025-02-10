import { getPrismaClient } from "./signelton";

const prisma = getPrismaClient();

export interface ProductInterface {
  name: string,
  slug: string,
  description?: string,
  price?: string,
  mainImageUrl?: string,
  otherImagesUrl?: string,
  videoUrl?: string,
  videoId?: number,
  stock?: number,
  tags?: string,

  isAffiliateLink?: boolean,
  affiliateLink?: string,
  affiliateHost?: string

  categoryId: number,
  globalSubCategoryId: number

}


export const createProductForCategoryIdAndGlobalSubCategoryId = async(productData: ProductInterface) => {
  try {
    const response = await prisma.product.create({
      data: {
        name: productData.name,
        slug: productData.slug,
        description:productData?.description,
        price: productData?.price,
        mainImageUrl: productData?.mainImageUrl,
        otherImagesUrl: productData?.otherImagesUrl,
        videoUrl: productData?.videoUrl,
        videoId: productData?.videoId,
        stock: productData?.stock,
        tags: productData?.tags,
      
        isAffiliateLink: productData?.isAffiliateLink,
        affiliateLink: productData?.affiliateLink,
        affiliateHost: productData?.affiliateHost,
        category: {
          connect: {
            id: productData.categoryId
          },
        },
        globalSubcategory: {
          connect: {
            id: productData.globalSubCategoryId
          }
        }
      },
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error while Creating Product:', error);
    return { status: false, error: error };
  }

}

export const getAllProducts = async() => {
  try {
    const response  = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        mainImageUrl: true,
        otherImagesUrl: true,
        videoUrl: true,
        videoId: true,
        stock: true,
        tags: true,
      
        isAffiliateLink: true,
        affiliateLink: true,
        affiliateHost: true,

        categoryId: true
      }
    });

    return { status: true, data: response };

  } catch(error) {
    console.error('Error fetching products:', error);
    return { status: false, error: error };
  }
}


export const getProductsByRange = async (startIndex: number, endIndex: number, limit: number) => {
  try {
    const response = await prisma.product.findMany({
      where: {
        id: {
          gte: startIndex,
          lte: endIndex,
        },
      },
      orderBy: {
        id: 'asc',
      },
      take: limit, // Ensures that only 'limit' products are returned
    });

    return { status: true, data: response };
    
  } catch (error) {
    console.error('Error fetching products by range:', error);
    return { status: false, error: error };
  }
};

export const getProductsByRangeForSubCategoryId = async (startIndex: number, endIndex: number, limit: number, subCategoryId: number) => {
  try {
    const response = await prisma.product.findMany({
      where: {
        globalSubCategoryId: subCategoryId, // Filter products by globalSubCategoryId
        id: {
          gte: startIndex,
          lte: endIndex,
        },
      },
      orderBy: {
        id: 'asc',
      },
      take: limit, // Ensures that only 'limit' products are returned
    });

    return { status: true, data: response };
    
  } catch (error) {
    console.error('Error fetching products by range:', error);
    return { status: false, error: error };
  }
};


export const getProductsByRangeAndUserId = async (startIndex: number, endIndex: number, limit: number, userId: number) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        id: {
          gte: startIndex,
          lte: endIndex,
        },
      },
      orderBy: {
        id: 'asc',
      },
      take: limit,
      include: {
        wishedByUsers: {
          select: {
            userId: true,
          },
        },
      },
    });

    const result = products.map((product) => {
      return {
        ...product,
        isWishedByUser: product.wishedByUsers.some((user) => user.userId === userId),
      };
    });

    return { status: true, data: result };
    
  } catch (error) {
    console.error('Error fetching products by range and user ID:', error);
    return { status: false, error: error };
  }
};


export const getProductByProductId = async(productId: number) => {
  try {
    const response = await prisma.product.findFirst({
      where: {
        id: productId
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        mainImageUrl: true,
        otherImagesUrl: true,
        videoUrl: true,
        videoId: true,
        stock: true,
        tags: true,
      
        isAffiliateLink: true,
        affiliateLink: true,
        affiliateHost: true,

        categoryId: true
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Finding products:', error);
    return { status: false, error: error };
  }
}

export const getProductsByCategoryId = async(categoryId: number) => {
  try {
    const response = await prisma.product.findMany({
      where: {
        categoryId: categoryId
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Finding products:', error);
    return { status: false, error: error };
  }
}

export const getProductsByGlobalSubCategoryId = async(globalSubCategoryId: number) => {
  try {
    const response = await prisma.product.findMany({
      where: {
        globalSubCategoryId: globalSubCategoryId
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Finding products:', error);
    return { status: false, error: error };
  }
}

export const getProductsByStoreId = async(storeId: number) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        storeId: storeId
      },
      select: {
        id: true
      }
    })

    if(!categories || categories.length === 0) {
      return { status: false, message: "No Store found for this store id" };
    }

    const categoryIds = categories.map(category => category.id);
    const products = await prisma.product.findMany({
      where: {
        categoryId: { in: categoryIds },
      },
    });

    return { status: true, data: products };

  } catch(error) {
    console.error('Error Finding products:', error);
    return { status: false, error: error };
  }
}

export const getProductsByStoreSlug = async(storeSlug: string) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        slug: storeSlug
      },
      select: {
        id: true
      }
    })

    if(!categories || categories.length === 0) {
      return { status: false, message: "No Store found for this store id" };
    }

    const categoryIds = categories.map(category => category.id);
    const products = await prisma.product.findMany({
      where: {
        categoryId: { in: categoryIds },
      },
    });

    return { status: true, data: products };

  } catch(error) {
    console.error('Error Finding products:', error);
    return { status: false, error: error };
  }
}


interface updateProductInterface {
  id?: number,
  name?: string,
  slug?: string,
  description?: string,
  price?: string,
  mainImageUrl?: string,
  otherImagesUrl?: string,
  videoUrl?: string,
  videoId?: number,
  stock?: number,
  tags?: string,

  isAffiliateLink?: boolean,
  affiliateLink?: string,
  affiliateHost?: string,

  categoryId?: number
}

export const updateProductByProductId = async(productData: updateProductInterface, productId: number) => {
  try {
    const response = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        name: productData.name,
        slug: productData.slug,
        description:productData?.description,
        price: productData?.price,
        mainImageUrl: productData?.mainImageUrl,
        otherImagesUrl: productData?.otherImagesUrl,
        videoUrl: productData?.videoUrl,
        videoId: productData?.videoId,
        stock: productData?.stock,
        tags: productData?.tags,
      
        isAffiliateLink: productData?.isAffiliateLink,
        affiliateLink: productData?.affiliateLink,
        affiliateHost: productData?.affiliateHost
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Updaing products:', error);
    return { status: false, error: error };
  }

}

export const deleteproductByProductId = async(productId: number) => {
  try {
    const response = await prisma.product.delete({
      where: {
        id: productId
      }
    })

  return { status: true, data: response };

  } catch(error) {
    console.error('Error Deleting product:', error);
    return { status: false, error: error };
  }
}

