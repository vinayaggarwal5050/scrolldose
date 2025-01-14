import { getPrismaClient } from "./signelton";

const prisma = getPrismaClient();

export interface ProductInterface {
  name: string,
  description?: string,
  price?: string,
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

export const getProductById = async(id: number) => {
  try {
    const response = await prisma.product.findFirst({
      where: {
        id: id
      },
      select: {
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

export const getproductByChannelPartnerId = async(channelPartnerId: number) => {
  try {
    const response = await prisma.store.findFirst({
      where: {
        channelPartnerId: channelPartnerId
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

interface updateProductInterface {
  name: string,
  description?: string,
  price?: string,
  image?: string,
  link?: string,
  slug?: string,
  video?: string,
  tag?: string
}

export const updateProductByProductId = async(data: updateProductInterface, id: number) => {
  try {
    const response = await prisma.product.update({
      where: {
        id: id
      },
      data: {
        name: data?.name,
        description: data?.description,
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

export const deleteproductById = async(id: number) => {
  try {
    const response = await prisma.product.delete({
      where: {
        id: id
      }
    })

  } catch(error) {
    console.error('Error Deleting product:', error);
    return error;
  }
}


