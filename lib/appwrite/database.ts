import { Account, Avatars, Client, Databases, ID, ImageGravity, Models, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_EP,
  platform: process.env.EXPO_PUBLIC_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_DB_ID,
  usersCollectionId: process.env.EXPO_PUBLIC_USERS_ID,
  videosCollectionId: process.env.EXPO_PUBLIC_VIDEOS_ID,
  storageId: process.env.EXPO_PUBLIC_STORAGE_ID
}

const { 
  endpoint, 
  platform, 
  projectId,
  databaseId,
  usersCollectionId,
  videosCollectionId,
  storageId
} = appwriteConfig;

const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email: string, password: string, username: string) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    const newUser: Models.Document = await database.createDocument(
      databaseId,
      usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    )

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
}


export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    
    return session;
  } catch (error) {
    throw new Error(error as string);
  }
}

export const getCurrentUser = async (): Promise<Models.Document> => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      databaseId,
      usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (err) {
    throw new Error((err as { message: string }).message)
  }
}

export const getAllPosts = async (): Promise<Models.Document[]> => {
  try {
    const posts = await database.listDocuments(
      databaseId,
      videosCollectionId
    )

    return posts.documents;
  } catch (error) {
    throw new Error((error as { message: string }).message)
  }
}

export const getLatestPosts = async (): Promise<Models.Document[]> => {
  try {
    const posts = await database.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.orderDesc('$createdAt')]
    )

    return posts.documents;
  } catch (error) {
    throw new Error((error as { message: string }).message)
  }
}

export const searchPosts = async (query: string): Promise<Models.Document[]> => {
  try {
    const posts = await database.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.search('title', query)]
    )

    return posts?.documents;
  } catch (error) {
    console.log(error);
    throw new Error((error as { message: string }).message)
  }
}

export const getUserPosts = async (userId: string): Promise<Models.Document[]> => {
  try {
    const posts = await database.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.equal('creator', userId)]
    )

    return posts.documents;
  } catch (error) {
    throw new Error((error as { message: string }).message)
  }
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) { 
    throw new Error(error);
  }
}

export const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl;

  try {
    
    if (type === 'video') fileUrl = storage.getFileView(storageId, fileId);
    else if (type === 'image') fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, ImageGravity.Top, 100);
    else throw new Error('Invalid file type');

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export const uploadFile = async (file, type: string) => {
  if(!file) return;

  
  const asset = {
    name: file.mimeType,
    type: file.fileName,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );



    return await getFilePreview(uploadedFile.$id, type);
  } catch (error) {
    throw new Error(error)
  }
}

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnailUrl, 'image'),
      uploadFile(form.video, 'video'),
    ]);

    const newPost = await database.createDocument(
      databaseId, videosCollectionId, ID.unique(), {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId
      }
    )

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}