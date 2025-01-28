import { getPrismaClient } from "./signelton";

const prisma = getPrismaClient();

export interface ProductInterface {
  name: string,
  description?: string,
  price?: string,
  category?: string
  image?: string,
  link?: string,
  slug?: string,
  video?: string,
  tag?: string
}


export const createProductForStoreId = async(productData: ProductInterface, storeId: number) => {
  try {
    const response = await prisma.product.create({
      data: {
        name: productData.name,
        description: productData?.description,
        category: productData?.category,
        price: productData?.price,
        image: productData?.image,
        link: productData?.link,
        slug: productData?.slug,
        video: productData?.video,
        tag: productData?.tag,
        store: {
          connect: {
            id: storeId
          }
        }
      },
    })

    return response;

  } catch(error) {
    console.error('Error creating product:', error);
    return error;
  }

}

export const getAllProducts = async() => {
  try {
    const response  = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        link: true,
        slug: true,
        video: true,
        tag: true,
        createdAt: true,
        lastUpdate: true,

        storeId: true
      }
    });

    return response;

  } catch(error) {
    console.error('Error fetching products:', error);
    return error;
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

    return response;
  } catch (error) {
    console.error('Error fetching products by range:', error);
    return error;
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

    return result;
  } catch (error) {
    console.error('Error fetching products by range and user ID:', error);
    return error;
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
        description: true,
        price: true,
        image: true,
        link: true,
        slug: true,
        video: true,
        tag: true,
        createdAt: true,
        lastUpdate: true,

        storeId: true
      }
    })

    return response;

  } catch(error) {
    console.error('Error Finding products:', error);
    return error;
  }
}

export const getProductsByStoreId = async(storeId: number) => {
  try {
    const response = await prisma.product.findMany({
      where: {
        storeId: storeId
      }
    })

    return response;

  } catch(error) {
    console.error('Error Finding products:', error);
    return error;
  }
}

export const getProductsByStoreSlug = async(StoreSlug: string) => {
  try {
    const response = await prisma.store.findFirst({
      where: {
        slug: StoreSlug
      },
      include: {
        products: true
      }
    })

    return response;

  } catch(error) {
    console.error('Error Finding products:', error);
    return error;
  }
}

export const getProductsByStoreName = async(StoreName: string) => {
  try {
    const response = await prisma.store.findFirst({
      where: {
        name: StoreName
      },
      include: {
        products: true
      }
    })

    return response;

  } catch(error) {
    console.error('Error Finding products:', error);
    return error;
  }
}

export const getproductsByChannelPartnerId = async(channelPartnerId: number) => {
  try {
    const store = await prisma.store.findFirst({
      where: {
        channelPartnerId: channelPartnerId
      }
    })

    if(!store) {
      return "no store exists for this channel partner id"
    }
    
    const response = await prisma.product.findMany({
      where: {
        storeId: store.id
      }
    })

    return response;

  } catch(error) {
    console.error('Error Finding products:', error);
    return error;
  }
}

interface updateProductInterface {
  name: string,
  description?: string,
  category?: string
  price?: string,
  image?: string,
  link?: string,
  slug?: string,
  video?: string,
  tag?: string,
}

export const updateProductByProductId = async(data: updateProductInterface, productId: number) => {
  try {
    const response = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        name: data?.name,
        description: data?.description,
        category: data?.category,
        price: data?.price,
        image: data?.image,
        slug: data?.image,
        link: data?.link,
        video: data?.link,
        tag: data?.tag
      }
    })

    return response;

  } catch(error) {
    console.error('Error Updaing products:', error);
    return error;
  }

}

export const deleteproductByProductId = async(productId: number) => {
  try {
    const response = await prisma.product.delete({
      where: {
        id: productId
      }
    })

  } catch(error) {
    console.error('Error Deleting product:', error);
    return error;
  }
}


