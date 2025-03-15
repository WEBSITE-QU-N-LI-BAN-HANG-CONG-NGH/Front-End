export default function sitemap() {
    return [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/homepage`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/catalog`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/cataloglistview`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/productabout`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/productdetails`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/productspecs`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/contactus`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/shoppingcart1`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/shoppingcart2`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/useraccount`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/aboutus`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/faq`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/hoveredmenu`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/menu`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
    ];
  }
  