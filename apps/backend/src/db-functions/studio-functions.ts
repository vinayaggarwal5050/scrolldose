import { getPrismaClient } from "./signelton";

const prisma = getPrismaClient();

export interface StudioInterface {
  name: string,
  link: string,
}


export const createStudioForChannelPartnerId = async(studioData: StudioInterface, channelPartnerID: number) => {
  try {
    const response = await prisma.studio.create({
      data: {
        name: studioData.name,
        link: studioData?.link,
        channelPartner: {
          connect: {
            id: channelPartnerID
          }
        }
      },
      select: {
        id: true,
        name: true,
        link: true,
        channelPartnerId: true
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error("Error Occured While creating Studio:", error);
    return { status: false, error: error };
  }

}

export const getAllStudios = async() => {
  try {
    const response  = await prisma.studio.findMany({
     select: {
      id: true,
      name: true,
      link: true,
      channelPartnerId: true,
     } 
    })
    return { status: true, data: response };

  } catch(error) {
    console.error('Error fetching stores:', error);
    return { status: false, error: error };
  }
} 



export const getStudioByStudioId = async(studioId: number) => {
  try {
    const response = await prisma.studio.findFirst({
      where: {
        id: studioId
      },
      select: {
        id: true,
        name: true,
        link: true,
        channelPartnerId: true
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Finding stores:', error);
    return { status: false, error: error };
  }
}


export const getStudioByChannelPartnerId = async(channelPartnerId: number) => {
  try {
    const response = await prisma.studio.findFirst({
      where: {
        channelPartnerId: channelPartnerId
      },
      select: {
        id: true,
        name: true,
        link: true,
        channelPartnerId: true
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Finding stores:', error);
    return { status: false, error: error };
  }
}


export const getStudioByChannelPartnerEmail = async(channelPartnerEmail: string) => {
  try {
    const response = await prisma.channelPartner.findUnique({
      where: {
        email: channelPartnerEmail
      },
      include: {
        studio: true
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Finding stores:', error);
    return { status: false, error: error };
  }
}



export interface UpdateStudioInterface {
  name?: string,
  link?: string,
  id?: any,
  channelPartnerId?: any
}

export const updateStudioForStudioId = async(studioData: UpdateStudioInterface, studioId: number) => {
  try {
     const updatedStudio = await prisma.studio.update({
      where: {
        id: studioId
      },
      data: {
        name: studioData?.name,
        link: studioData?.link,
      },
      select: {
        id: true,
        channelPartnerId: true,
        name: true,
        link: true
      }
    })

    return {status: true, data: updatedStudio};

  } catch(error) {
    console.error('Error Finding stores:', error);
    return {status: false, error: error};
  }
}


// export const updateStudioForChannelPartnerEmail = async(studioData: UpdateStudioInterface, channelPartnerEmail: string) => {
//   try {
//     const channelPartner = await prisma.channelPartner.findFirst({
//       where: {
//         email: channelPartnerEmail
//       },
//       include: {
//         Studio: true
//       }
//     });

//     if (!channelPartner || !channelPartner.Studio) {
//       console.log("Channel Partner or Studio not found");
//       return null;
//     }

//     const updatedStudio = await prisma.studio.update({
//       where: {
//         id: channelPartner.Studio[0].id
//       },
//       data: {
//         name: studioData?.name,
//         link: studioData?.link,
//       },
//       select: {
//         id: true,
//         channelPartnerId: true,
//         name: true,
//         link: true
//       }
//     })

//     return {status: true, data: updatedStudio};

//   } catch(error) {
//     console.error('Error Finding stores:', error);
//     return {status: false, error: error}
//   }
// }


// export const updateStudioForChannelPartnerId = async(studioData: UpdateStudioInterface, channelPartnerId: number) => {
//   try {
//     const channelPartner = await prisma.channelPartner.findFirst({
//       where: {
//         id: channelPartnerId
//       },
//       include: {
//         Studio: true
//       }
//     });

//     if (!channelPartner || !channelPartner.Studio) {
//       console.log("Channel Partner or Store not found");
//       return null;
//     }

//     const updatedStore = await prisma.store.update({
//       where: {
//         id: channelPartner?.Studio[0]?.id
//       },
//       data: {
//         name: studioData?.name,
//         link: studioData?.link,
//       },
//       select: {
//         id: true,
//         channelPartnerId: true,
//         name: true,
//         link: true
//       }
//     })

//     return {status: true, data: updatedStore};

//   } catch(error) {
//     console.error('Error Finding stores:', error);
//     return {status: false, error: error}
//   }
// }


export const deleteStudioById = async(id: number) => {
  try {
    const response = await prisma.studio.delete({
      where: {
        id: id
      }
    })

    return {status: true, data: response};

  } catch(error) {
    console.error('Error Deleting store:', error);
    return {status: false, error: error};
  }
}



