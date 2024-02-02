import React, { useState } from "react";
import "./RecipeForm.scss";
import axios from "axios";
import { Form, Input, Upload, Button, Select, Space, message, Checkbox } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useAddRecipe } from "../../context/AddRecipeContext";

function Test() {
  const { uploadButton } = useAddRecipe();
  const [form] = Form.useForm();
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);


  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImageUrl(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }
    setSelectedImage(file);
    return false; // Prevent automatic upload
  };

  const handleUpload = async (info) => {
    handleImageChange(info);
    setLoading(true);
    if (!selectedImage) {
      message.error("No image selected");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      console.log(response.data.url);
      setLoading(false);
      setShowImage(true);

      setImageUrl(response.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/recipe", values);
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Form
        form={form}
        scrollToFirstError={true}
        initialValues={{
          recipe_cooking_time: 0,
          recipe_preptime: 0,
          recipe_servings: "#",
          recipe_cuisine: "Select Cuisine",
          recipe_collection: "Select Collection",
        }}
        onFinish={onFinish}
        layout="vertical"
        className="recipe-form"
        style={{
          maxWidth: 700,
        }}
      >
        {/*Input For Recipe Title */}
        <Form.Item
          label="Recipe Title:"
          name="recipe_title"
          className="recipe-title"
          colon={true}
          rules={[
            { required: true, message: "Please input the Recipe Title!" },
          ]}
        >
          <Input
            placeholder="Enter Your Recipe name"
            className="antd-form-input"
          />
        </Form.Item>

        {/*Input For Recipe Image Upload */}
        <Form.Item label="Upload Image">
          <Upload
            beforeUpload={beforeUpload}
            onChange={handleUpload}
            showUploadList={false}
          >
            {uploadButton}
          </Upload>
          {showImage ? (
            <div>
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  height: "100px",
                  objectFit: "fill",
                }}
              />
            </div>
          ) : (
            null
          )}
        </Form.Item>

        {/*Input For Recipe Description */}
        <Form.Item
          label="Description:"
          name="recipe_description"
          rules={[
            { required: true, message: "Please input the Recipe Description!" },
          ]}
        >
          <Input.TextArea
            showCount
            maxLength={100}
            placeholder="Introduce your recipe"
            className="antd-form-input"
          />
        </Form.Item>

        {/* Input For Recipe Ingredients */}
        <Form.Item label="Ingredients">
          <Form.List name="recipe_ingredients">
            {(subFields, subOpt) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 16,
                }}
              >
                {subFields.map((subField) => (
                  <Space key={subField.key}>
                    <Form.Item noStyle name={[subField.name, "ingredient"]}>
                      <Input placeholder="Write Ingredients" />
                    </Form.Item>
                    <CloseOutlined
                      onClick={() => {
                        subOpt.remove(subField.name);
                      }}
                    />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => subOpt.add()}>
                  +
                </Button>
              </div>
            )}
          </Form.List>
        </Form.Item>

        {/*Input For Recipe Instructions */}
        <Form.Item label="Instructions">
          <Form.List name="recipe_instructions">
            {(subFields, subOpt) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 16,
                }}
              >
                {subFields.map((subField) => (
                  <Space key={subField.key}>
                    <Form.Item noStyle name={[subField.name, "instruction"]}>
                      <Input placeholder="Write Instructions" />
                    </Form.Item>
                    <CloseOutlined
                      onClick={() => {
                        subOpt.remove(subField.name);
                      }}
                    />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => subOpt.add()}>
                  +
                </Button>
              </div>
            )}
          </Form.List>
        </Form.Item>

        {/*Input For Recipe Servings*/}
        <Form.Item
          label="Servings:"
          name="recipe_servings"
          rules={[
            { required: true, message: "Please input the Recipe Serving!" },
          ]}
        >
          <Input placeholder="#" className="antd-form-input" />
        </Form.Item>

        {/*Input For Recipe Cooking Time*/}
        <Form.Item
          label="Cooking Time:"
          name="recipe_cooking_time"
          className="cooking-time"
          rules={[
            {
              required: true,
              message: "Please input the Recipe Cooking time!",
            },
          ]}
        >
          <Input
            placeholder="Hours 0"
            className="cooking-time-input antd-form-input"
          />
        </Form.Item>

        {/*Input For Recipe Prep Time*/}
        <Form.Item
          label="Prep Time:"
          name="recipe_preptime"
          className="prep-time"
          rules={[
            {
              required: true,
              message: "Please input the Recipe Preparation time!",
            },
          ]}
        >
          <Input
            placeholder="Hours 0"
            className="prep-time-input antd-form-input"
          />
        </Form.Item>

        {/*Input For Recipe cuisine*/}
        <Form.Item
          label="Cuisine:"
          name="recipe_cuisine"
          rules={[{ required: true, message: "Please select the cuisine!" }]}
        >
          <Select
            // defaultValue={"Italian"}
            placeholder="Italian"
            style={{ width: 200 }}
            className="antd-form-input"
          >
            <Select.Option value="Thai">Thai</Select.Option>
            <Select.Option value="Chinese">Chinese</Select.Option>
            <Select.Option value="Italian">Italian</Select.Option>
          </Select>
        </Form.Item>

        {/*Input For Recipe Nutrition Facts*/}
        <div className="facts">
          {/*Input For Recipe Fats*/}
          <Form.Item
            label="Fats:"
            name="recipe_fats"
            rules={[{ required: true, message: "Please enter the Fats!" }]}
          >
            <Input placeholder="#" className="antd-form-input less" />
          </Form.Item>

          {/*Input For Recipe Proteins*/}
          <Form.Item
            label="Protiens:"
            name="recipe_protiens"
            rules={[{ required: true, message: "Please enter the Protiens!" }]}
          >
            <Input placeholder="#" className="antd-form-input less" />
          </Form.Item>

          {/*Input For Recipe Calories*/}
          <Form.Item
            label="Calories:"
            name="recipe_calories"
            rules={[{ required: true, message: "Please enter the Calories!" }]}
          >
            <Input placeholder="#" className="antd-form-input less" />
          </Form.Item>

          {/*Input For Recipe Carbohydrates*/}
          <Form.Item
            label="Carbohydrates:"
            name="recipe_carbohydrates"
            rules={[
              { required: true, message: "Please enter the Carbohydrates!" },
            ]}
          >
            <Input placeholder="#" className="antd-form-input less" />
          </Form.Item>

          {/*Input For Recipe Net-Carbs*/}
          <Form.Item
            label="Net-Carbs:"
            name="recipe_net_carbons"
            rules={[
              { required: true, message: "Please enter the Net Carbs!" },
            ]}
          >
            <Input placeholder="#" className="antd-form-input less" />
          </Form.Item>

          {/*Input For Recipe Fibers*/}
          <Form.Item
            label="Fibers:"
            name="recipe_fiber"
            rules={[{ required: true, message: "Please enter the Fibers!" }]}
          >
            <Input placeholder="#" className="antd-form-input less" />
          </Form.Item>

          {/*Input For Recipe Sodium*/}
          <Form.Item
            label="Sodium:"
            name="recipe_sodium"
            rules={[{ required: true, message: "Please enter the Sodium!" }]}
          >
            <Input placeholder="#" className="antd-form-input less" />
          </Form.Item>

          {/*Input For Recipe Cholesterol*/}
          <Form.Item
            label="Cholesterol:"
            name="recipe_cholesterol"
            rules={[
              { required: true, message: "Please enter the Cholesterol!" },
            ]}
          >
            <Input placeholder="#" className="antd-form-input less" />
          </Form.Item>
        </div>


        {/*Input For Recipe Collection*/}
        <Form.Item
          label="Collection:"
          name="recipe_collection"
          rules={[
            { required: true, message: "Please select the Recipe Collection!" },
          ]}
        >
          <Select
            placeholder="Select Collection"
            style={{ width: 200 }}
            className="antd-form-input"
          >
            <Select.Option value="New Collection">New Collection</Select.Option>
            <Select.Option value="Cook Book">Cook Book</Select.Option>
            <Select.Option value="My Recipe">My Recipe</Select.Option>
          </Select>
        </Form.Item>

        {/*Input For Recipe Show or Not*/}
        <Form.Item
          name="show_on_recipe_page"
          valuePropName="checked"
          initialValue={true}
          className="show-on-recipe"
        >
          <Checkbox>Show on Recipe Page</Checkbox>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button className="bg-primary text-white bold disable-hover" htmlType="submit">
            Submit
          </Button>

        </Form.Item>
      </Form>
    </div>
  );
}

export default Test;
