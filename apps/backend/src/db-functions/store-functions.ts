import { getPrismaClient } from "./signelton";

const prisma = getPrismaClient();

export interface StoreInterface {
  name: string,
  slug?: string,
}


export const createStoreForChannelPartnerId = async(storeData: StoreInterface, channelPartnerID: number) => {
  try {
    const response = await prisma.store.create({
      data: {
        name: storeData.name,
        slug: storeData?.slug,
        channelPartner: {
          connect: {
            id: channelPartnerID
          }
        }
      },
    })

    return response;

  } catch(error) {
    console.error('Error creating store:', error);
    return error;
  }

}


export const getAllStores = async() => {
  try {
    const response  = await prisma.store.findMany({
     select: {
      id: true,
      name: true,
      slug: true,
      channelPartnerId: true,
     } 
    })
    return response;

  } catch(error) {
    console.error('Error fetching stores:', error);
    return error;
  }
} 


export const getStoreByStoreId = async(storeId: number) => {
  try {
    const response = await prisma.store.findFirst({
      where: {
        id: storeId
      }
    })

    return response;

  } catch(error) {
    console.error('Error Finding stores:', error);
    return error;
  }
}

export const getStoreByChannelPartnerId = async(channelPartnerId: number) => {
  try {
    const response = await prisma.store.findFirst({
      where: {
        channelPartnerId: channelPartnerId
      }
    })

    return response;

  } catch(error) {
    console.error('Error Finding stores:', error);
    return error;
  }
}

export const getStoreByChannelPartnerEmail = async(channelPartnerEmail: string) => {
  try {
    const response = await prisma.channelPartner.findUnique({
      where: {
        email: channelPartnerEmail
      },
      include: {
        store: true
      }
    })

    return response;

  } catch(error) {
    console.error('Error Finding stores:', error);
    return error;
  }
}

export interface UpdateStoreInterface {
  name?: string,
  slug?: string,
}

export const updateStoreForStoreId = async(storeData: UpdateStoreInterface, storeId: number) => {
  try {
     const updatedStore = await prisma.store.update({
      where: {
        id: storeId
      },
      data: {
        name: storeData?.name,
        slug: storeData?.slug,
      }
    })

    return updatedStore;

  } catch(error) {
    console.error('Error Finding stores:', error);
    return error;
  }
}

export const updateStoreForChannelPartnerEmail = async(storeData: UpdateStoreInterface, channelPartnerEmail: string) => {
  try {
    const channelPartner = await prisma.channelPartner.findFirst({
      where: {
        email: channelPartnerEmail
      },
      include: {
        store: true
      }
    });

    if (!channelPartner || !channelPartner.store) {
      console.log("Channel Partner or Store not found");
      return null;
    }

    const updatedStore = await prisma.store.update({
      where: {
        id: channelPartner.store[0].id
      },
      data: {
        name: storeData?.name,
        slug: storeData?.slug,
      }
    })

    return updatedStore;

  } catch(error) {
    console.error('Error Finding stores:', error);
    return error;
  }
}

export const updateStoreForChannelPartnerId = async(storeData: UpdateStoreInterface, channelPartnerId: number) => {
  try {
    const channelPartner = await prisma.channelPartner.findFirst({
      where: {
        id: channelPartnerId
      },
      include: {
        store: true
      }
    });

    if (!channelPartner || !channelPartner.store) {
      console.log("Channel Partner or Store not found");
      return null;
    }

    const updatedStore = await prisma.store.update({
      where: {
        id: channelPartner.store[0].id
      },
      data: {
        name: storeData?.name,
        slug: storeData?.slug,
      }
    })

    return updatedStore;

  } catch(error) {
    console.error('Error Finding stores:', error);
    return error;
  }
}


export const deleteStoreById = async(id: number) => {
  try {
    const response = await prisma.store.delete({
      where: {
        id: id
      }
    })

  } catch(error) {
    console.error('Error Deleting store:', error);
    return error;
  }
}


