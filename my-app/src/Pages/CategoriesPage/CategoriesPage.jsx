import React from "react";
import "./CategoriesPage.scss";
import Card1 from "../../components/Card1/Card1";
import { Breadcrumb } from "antd";

function CategoryPage() {
  return (
    <div className="category-page">
      <Breadcrumb
        separator=">"
        items={[
          {
            title: 'Home',
            href: '/',
            className: 'bold',
          },
          {
            title: 'Categories',
            href: '/category',
            className: 'bold',
          },
        ]}
      />
      <Card1 />
      <Card1 />
    </div>
  );
}

export default CategoryPage;
