

const DB_NAME = "TaskManagerDB";
const STORE_NAME = "uploadedFiles";


const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
};


const saveFileToStorage = async (file, fileId) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.add({
      id: fileId,
      name: file.name,
      type: file.type,
      size: file.size,
      blob: file,
      uploadedAt: new Date().toISOString(),
    });

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(fileId);
  });
};


const getFileFromStorage = async (fileId) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.get(fileId);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};


const deleteFileFromStorage = async (fileId) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.delete(fileId);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};


export const uploadFiles = async (files) => {
  if (!files || files.length === 0) {
    return [];
  }

  try {
    const uploadedFilesData = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${file.name}`;

      await saveFileToStorage(file, fileId);

      uploadedFilesData.push({
        name: file.name,
        size: file.size,
        type: file.type,
        path: fileId,  
        uploadedAt: new Date().toISOString(),
      });
    }

    return uploadedFilesData;
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
};


export const downloadFile = async (filePath, fileName) => {
  try {
    const fileData = await getFileFromStorage(filePath);

    if (!fileData) {
      throw new Error("File not found");
    }

    const blob = fileData.blob;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("File download error:", error);
    throw error;
  }
};


export const deleteFile = async (filePath) => {
  try {
    await deleteFileFromStorage(filePath);
    return { success: true, message: "File deleted" };
  } catch (error) {
    console.error("File delete error:", error);
    throw error;
  }
};

export const getFilePreviewUrl = async (filePath) => {
  try {
    const fileData = await getFileFromStorage(filePath);

    if (!fileData) {
      throw new Error("File not found");
    }

    return URL.createObjectURL(fileData.blob);
  } catch (error) {
    console.error("Preview error:", error);
    throw error;
  }
};
