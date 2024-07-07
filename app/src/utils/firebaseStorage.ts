import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { nanoid } from "nanoid";

export const uploadFile = async (file: File, folder: string, userId: string) => {
    try {
      const filename = `${userId}-${nanoid()}.${file.name.split('.').pop()}`;
      const storageRef = ref(storage, `${folder}/${filename}`);
      const res = await uploadBytes(storageRef, file);
      return res.metadata.fullPath;
    } catch (error) {
      throw error;
    }
  };
  
  export const getFile = async (path: string) => {
    try {
      const fileRef = ref(storage, path);
      return await getDownloadURL(fileRef);
    } catch (error) {
      throw error;
    }
  };