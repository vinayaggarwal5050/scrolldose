import { getPrismaClient } from "./signelton";

const prisma = getPrismaClient();

export interface ChannelPartnerInterface {
  email: string,
  password: string,
  name? : string,
}


export const createChannelPartner = async(channelPartnerData: ChannelPartnerInterface) => {
  try {
    const response = await prisma.channelPartner.create({
      data: {
        email: channelPartnerData.email,
        password: channelPartnerData.password,
        name: channelPartnerData?.name
      },
    })

    return response;

  } catch(error) {
    console.error('Error creating channelPartner:', error);
    return error;
  }

}


export const getAllChannelPartners = async() => {
  try {
    const response  = await prisma.channelPartner.findMany({
     select: {
      id: true,
      email: true,
      password: true,
      name: true,
      role: true,
      createdAt: true,
      store: true
     } 
    })
    return response;

  } catch(error) {
    console.error('Error fetching channelPartners:', error);
    return error;
  }
} 

export const getChannelPartnerByEmail = async(email: string) => {
  try {
    const response = await prisma.channelPartner.findFirst({
      where: {
        email: email
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
        createdAt: true,
        store: true
       } 
    })

    return response;

  } catch(error) {
    console.error('Error Finding channelPartners:', error);
    return error;
  }
}

export const getChannelPartnerById = async(id: number) => {
  try {
    const response = await prisma.channelPartner.findFirst({
      where: {
        id: id
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
        createdAt: true,
        store: true
       } 
    })

    return response;

  } catch(error) {
    console.error('Error Finding channelPartners:', error);
    return error;
  }
}

interface ChannelPartnerUpdateInterface {
  id? : number,
  email?: string,
  password?: string
  name?: string,
}

export const updateChannelPartnerforEmail = async(data: ChannelPartnerUpdateInterface) => {
  try {
    const response = await prisma.channelPartner.update({
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
    console.error('Error Updating channelPartner:', error);
    return error;
  }
}

export const updateChannelPartnerforId = async(data: ChannelPartnerUpdateInterface) => {
  try {
    const response = await prisma.channelPartner.update({
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
    console.error('Error Updating channelPartner:', error);
    return error;
  }
}


export const deleteChannelPartnerById = async(id: number) => {
  try {
    const response = await prisma.channelPartner.delete({
      where: {
        id: id
      }
    })

  } catch(error) {
    console.error('Error selecting channelPartner:', error);
    return error;
  }
}

export const deleteChannelPartnerByEmail = async(email: string) => {
  try {
    const response = await prisma.channelPartner.delete({
      where: {
        email: email
      }
    })

  } catch(error) {
    console.error('Error selecting channelPartner:', error);
    return error;
  }
}
