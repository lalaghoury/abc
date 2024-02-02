import { Form } from "antd";
import { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useAddData } from "./DataContext";



const AddRecipeContext = createContext();

export const AddRecipeProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();
  const { addData, setAddData } = useAddData();


  function loadFromLocalStorage(key) {
    try {
      const item = localStorage.getItem(key);
      if (!item) {
        return [];
      }
      return JSON.parse(item);
    } catch (error) {
      console.error("Error retrieving item from local storage:", error);
    }
  }

  function saveToLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving item to local storage:", error);
    }
  }

  function getAllRecepies() {
    return loadFromLocalStorage("recepies");
  }

  function addRecepie(recepie) {
    let recepies = getAllRecepies();
    recepies = [...recepies, recepie];
    setAddData(recepies);
    console.log('add', addData)
    saveToLocalStorage("addRecipes", addData);
    saveToLocalStorage("recepies", recepies);
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = (e) => {
    const allRecipies = getAllRecepies();
    const newRecipe = { ...e, id: nanoid(), image: imageUrl }; // Create a single recipe object
    const updatedRecipes = [...allRecipies, newRecipe];
    addRecepie(newRecipe); // Pass the single recipe object to addRecepie
    console.log(updatedRecipes);
    saveToLocalStorage("recepies", updatedRecipes);
    saveToLocalStorage("addRecipes", updatedRecipes);
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
    console.log(reader.readAsDataURL(img));
  };

  const beforeUpload = (e) => {
    const isImage = e.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };

  const handleImageChange = (e) => {
    if (e.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (e.file.status === "done") {
      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        this.setState({
          file: file,
          setImageUrl: reader.result,
        });
      };
    }
  };
  const uploadButton = (
    <div style={{ textAlign: "center" }}>
      {loading ? <LoadingOutlined /> : null}
      <div>
        <PlusOutlined /> Upload
      </div>
    </div>
  );

  return (
    <AddRecipeContext.Provider
      value={{
        saveToLocalStorage,
        loadFromLocalStorage,
        getAllRecepies,
        addRecepie,
        normFile,
        onFinish,
        getBase64,
        beforeUpload,
        handleImageChange,
        uploadButton,
        form,
        imageUrl,
        setImageUrl,
        loading,
        setLoading,
      }}
    >
      {children}
    </AddRecipeContext.Provider>
  );
};

export const useAddRecipe = () => {
  const context = useContext(AddRecipeContext);
  if (!context) {
    throw new Error("useAddRecipe must be used within a AddRecipeProvider");
  }
  return context;
};
