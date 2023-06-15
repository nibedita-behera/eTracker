import { Client,Account,Databases } from 'appwrite';


const endpoint = 'https://cloud.appwrite.io/v1'; // Replace [APPWRITE_ENDPOINT] with your Appwrite endpoint
const project = '6475ed780344f01c4b66'; // Replace 'your_project_id' with your Appwrite project ID

const appwrite = new Client();

appwrite
  .setEndpoint(endpoint)
  .setProject(project)
   // Replace with your Appwrite project ID
 // Replace with your Appwrite API key
export const account = new Account(appwrite);
export const database=new Databases(appwrite,'6487fa3c68cadbcea3c1')
export const collectionId='6487fa75b30eba4f8a73'
export const databaseId='6487fa3c68cadbcea3c1'
export default appwrite;
