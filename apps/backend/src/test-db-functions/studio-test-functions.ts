import { StudioInterface, UpdateStudioInterface, createStudioForChannelPartnerId, getAllStudios, getStudioByStudioId, getStudioByChannelPartnerId, getStudioByChannelPartnerEmail, updateStudioForStudioId, deleteStudioById  } from "../db-functions/studio-functions";

const data1: StudioInterface = {
  name: "studio 1",
  link: "studio.1"
}
const data2: StudioInterface = {
  name: "studio 2",
  link: "studio.2"
}
const data3: StudioInterface = {
  name: "studio 3",
  link: "studio.3"
}

const channelPartnerId: number = 38;

const testFn = async() => {
  // console.log( await createStudioForChannelPartnerId(data3, channelPartnerId) );
  console.log( await getAllStudios() );
  // console.log( await getStudioByStudioId(8));
  // console.log( await getStudioByChannelPartnerId(36));
  // console.log( await getStudioByChannelPartnerEmail("tester3@gmail.com"));
  // console.log(await updateStudioForStudioId({"link": "studio@1", name: "studio-1"}, 7));
  // console.log(await deleteStudioById(9));

}

testFn();

