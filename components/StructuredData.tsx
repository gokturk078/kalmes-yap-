export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ConstructionBusiness",
    "name": "KALMES YAPI İNŞAAT",
    "image": "https://kalmesyapi.com/logo.jpg",
    "@id": "https://kalmesyapi.com",
    "url": "https://kalmesyapi.com",
    "telephone": "+905367644931",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Merkez Ofis",
      "addressLocality": "Trabzon",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.0027,
      "longitude": 39.7168
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://facebook.com/kalmesyapi",
      "https://instagram.com/kalmesyapi",
      "https://linkedin.com/company/kalmesyapi"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Cyprus"
    },
    "description": "KALMES YAPI, Kıbrıs ve Türkiye genelinde büyük ölçekli altyapı, havalimanı ve sanayi tesisleri inşa eden lider mühendislik firmasıdır."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
