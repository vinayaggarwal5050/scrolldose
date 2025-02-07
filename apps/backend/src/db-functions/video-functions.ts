import { getPrismaClient } from "./signelton";

const prisma = getPrismaClient();

export interface VideoInterface {
  title: string,
  slug?: string,
  category?: string,
  categoryId?: number,
  thumbnailPath?: string,
  filePath?: string,
  status? : string,
  tags?: string
}


export const createVideoEntryForStudioId = async(videoData: VideoInterface, studioId: number) => {
  try {
    const response = await prisma.video.create({
      data: {
        title: videoData.title,
        slug: videoData.slug,
        category: videoData?.category,
        categoryId: videoData?.categoryId,
        thumbnailPath: videoData?.thumbnailPath,
        tags: videoData?.tags,
        status: videoData?.status,
        studio: {
          connect: {
            id: studioId
          }
        }
      },
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Creating Video Entry:', error);
    return { status: true, error: error };
  }

}



export const getAllVideoEnteries = async() => {
  try {
    const response  = await prisma.video.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        categoryId: true,
        tags: true,
        filePath: true,
        thumbnailPath : true,
        status: true,
        studioId: true,
        createdAt: true,
        lastUpdate: true,
      }
    });

    return { status: true, data: response };

  } catch(error) {
    console.error('Error fetching videos:', error);
    return { status: true, error: error };
  }
}


// export const getProductsByRange = async (startIndex: number, endIndex: number, limit: number) => {
//   try {
//     const response = await prisma.product.findMany({
//       where: {
//         id: {
//           gte: startIndex,
//           lte: endIndex,
//         },
//       },
//       orderBy: {
//         id: 'asc',
//       },
//       take: limit, // Ensures that only 'limit' products are returned
//     });

//     return response;
//   } catch (error) {
//     console.error('Error fetching products by range:', error);
//     return error;
//   }
// };



// export const getProductsByRangeAndUserId = async (startIndex: number, endIndex: number, limit: number, userId: number) => {
//   try {
//     const products = await prisma.product.findMany({
//       where: {
//         id: {
//           gte: startIndex,
//           lte: endIndex,
//         },
//       },
//       orderBy: {
//         id: 'asc',
//       },
//       take: limit,
//       include: {
//         wishedByUsers: {
//           select: {
//             userId: true,
//           },
//         },
//       },
//     });

//     const result = products.map((product) => {
//       return {
//         ...product,
//         isWishedByUser: product.wishedByUsers.some((user) => user.userId === userId),
//       };
//     });

//     return result;
//   } catch (error) {
//     console.error('Error fetching products by range and user ID:', error);
//     return error;
//   }
// };



export const getVideoEntryByVideoId = async(videoId: number) => {
  try {
    const response = await prisma.video.findFirst({
      where: {
        id: videoId
      },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        categoryId: true,
        tags: true,
        status: true,
        filePath: true,
        thumbnailPath : true,
        studioId: true,
        createdAt: true,
        lastUpdate: true,
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Finding Video:', error);
    return { status: true, error: error };
  }
}

export const getVideoEntryByVideoSlug = async(videoSlug: string) => {
  try {
    const response = await prisma.video.findFirst({
      where: {
        slug: videoSlug
      },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        categoryId: true,
        tags: true,
        status: true,
        filePath: true,
        thumbnailPath : true,
        studioId: true,
        createdAt: true,
        lastUpdate: true,
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Finding Video:', error);
    return { status: true, error: error };
  }
}

export const getVideoEnteriesForStudioId = async(studioId: number) => {
  try {
    const response = await prisma.video.findMany({
      where: {
        studioId: studioId
      },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        categoryId: true,
        tags: true,
        status: true,
        filePath: true,
        thumbnailPath : true,
        studioId: true,
        createdAt: true,
        lastUpdate: true,
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Finding Video:', error);
    return { status: true, error: error };
  }
}

interface updateVideoEntrynterface {
  id?: number,
  title?: string,
  slug?: string,
  category?: string,
  categoryId? : number,
  thumbnailPath?: string,
  filePath?: string,
  status? : string,
  tags?: string,
  studioId?: number
}

export const updateVideoByVideoId = async(data: updateVideoEntrynterface, videoId: number) => {
  try {
    const response = await prisma.video.update({
      where: {
        id: videoId
      },
      data: {
        title: data?.title,
        slug: data?.slug,
        category: data?.category,
        categoryId: data?.categoryId,
        tags: data?.tags,
        status: data?.status,
        thumbnailPath: data?.thumbnailPath,
        filePath: data?.filePath,
       }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Updaing video:', error);
    return { status: true, error: error };
  }

}

export const deleteVideoEntryByVideoId = async(videoId: number) => {
  try {
    const response = await prisma.video.delete({
      where: {
        id: videoId
      }
    })

    return { status: true, data: response };

  } catch(error) {
    console.error('Error Deleting Video Entry:', error);
    return { status: true, error: error };
  }
}


