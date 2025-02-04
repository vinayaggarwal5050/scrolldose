import { getPrismaClient } from "./signelton";

const prisma = getPrismaClient();

export interface ChannelPartnerInterface {
  email: string,
  password: string,
  name? : string,
}


export const createChannelPartner = async (
  channelPartnerData: ChannelPartnerInterface
): Promise<{ status: boolean; data?: any; error?: string }> => {
  try {
    // Check if email already exists
    const existingPartner = await prisma.channelPartner.findUnique({
      where: { email: channelPartnerData.email },
    });

    if (existingPartner) {
      return { status: false, error: "Email already exists" };
    }

    // Create a new channel partner if email does not exist
    const response = await prisma.channelPartner.create({
      data: {
        email: channelPartnerData.email,
        password: channelPartnerData.password,
        name: channelPartnerData?.name,
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
    });

    return { status: true, data: response };
  } catch (error) {
    console.error("Error creating channelPartner:", error);
    return { status: false, error: "An error occurred while creating channel partner" };
  }
};


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
    return { status: true, data: response};

  } catch(error) {
    console.error('Error fetching channelPartners:', error);
    return { status: false, error: error };
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

    return { status: true, data: response};;

  } catch(error) {
    console.error('Error Finding channelPartners:', error);
    return { status: false, error: error };
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

    return { status: true, data: response};

  } catch(error) {
    console.error('Error Finding channelPartners:', error);
    return { status: false, error: error };
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

    return {status: true, data: response} ;

  } catch(error) {
    console.error('Error Updating channelPartner:', error);
    return {status: false, error: error};
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

    return {status: true, data: response} ;

  } catch(error) {
    console.error('Error Updating channelPartner:', error);
    return {status: false, error: error};
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
