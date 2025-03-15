import React from "react";
import Link from "next/link";
const Home = () => {
  return (
    <div style={{ height: "100vh", padding: "20px", backgroundColor: "#232323", color: "white" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Main page</h1>
      <ul style={{ listStyle: "none", padding: "0" }}>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/homepage" style={{ color: "#87CEFA", textDecoration: "none" }}>
            Homepage
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/catalog" style={{ color: "#87CEFA", textDecoration: "none" }}>
            Catalog
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/cataloglistview" style={{ color: "#87CEFA", textDecoration: "none" }}>
            CatalogListView
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/productabout" style={{ color: "#87CEFA", textDecoration: "none" }}>
            ProductAbout
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/productdetails" style={{ color: "#87CEFA", textDecoration: "none" }}>
            ProductDetails
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/productspecs" style={{ color: "#87CEFA", textDecoration: "none" }}>
            ProductSpecs
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/contactus" style={{ color: "#87CEFA", textDecoration: "none" }}>
            ContactUs
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/register" style={{ color: "#87CEFA", textDecoration: "none" }}>
            Register
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/shoppingcart1" style={{ color: "#87CEFA", textDecoration: "none" }}>
            ShoppingCart1
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/shoppingcart2" style={{ color: "#87CEFA", textDecoration: "none" }}>
            ShoppingCart2
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/checkout" style={{ color: "#87CEFA", textDecoration: "none" }}>
            Checkout
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/useraccount" style={{ color: "#87CEFA", textDecoration: "none" }}>
            UserAccount
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/aboutus" style={{ color: "#87CEFA", textDecoration: "none" }}>
            AboutUs
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/faq" style={{ color: "#87CEFA", textDecoration: "none" }}>
            FAQ
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/hoveredmenu" style={{ color: "#87CEFA", textDecoration: "none" }}>
            HoveredMenu
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/menu" style={{ color: "#87CEFA", textDecoration: "none" }}>
            Menu
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
