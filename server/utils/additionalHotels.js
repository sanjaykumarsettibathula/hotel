const additionalHotels = [
  {
    name: "Grand Riverside Resort",
    type: "hotel",
    location: "Mumbai, Maharashtra",

    price: 12500,
    rating: 4.7,
    reviews: 128,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop"
    ],
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Room Service", "Parking"],
    description: "Experience luxury on the banks of the Arabian Sea with stunning ocean views and world-class amenities.",
    host: {
      name: "Raj Malhotra",
      joinedDate: "January 2019",
      avatar: ""
    },
    details: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      baths: 2
    },
    highlights: [
      "Panoramic sea views from every room",
      "Award-winning rooftop restaurant",
      "Infinity pool overlooking the ocean"
    ],
    tags: ["Luxury", "Ocean View"]
  },
  {
    name: "Emerald Valley Retreat",
    type: "mountain",
    location: "Munnar, Kerala",

    price: 8500,
    rating: 4.8,
    reviews: 95,
    images: [
      "https://images.unsplash.com/photo-1585543805890-6051f7829f98?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595877244574-e90ce41ce089?q=80&w=2070&auto=format&fit=crop"
    ],
    amenities: ["WiFi", "Fireplace", "Mountain View", "Hiking Trails", "Breakfast", "Parking"],
    description: "Nestled in the lush tea plantations of Munnar, this mountain retreat offers tranquility and breathtaking views.",
    host: {
      name: "Priya Thomas",
      joinedDate: "March 2020",
      avatar: ""
    },
    details: {
      guests: 6,
      bedrooms: 3,
      beds: 3,
      baths: 2
    },
    highlights: [
      "Surrounded by tea plantations",
      "Private balconies with mountain views",
      "Guided nature walks available"
    ],
    tags: ["Nature", "Peaceful"]
  },
  {
    name: "Golden Sands Beach House",
    type: "beach",
    location: "Goa, India",

    price: 15000,
    rating: 4.9,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?q=80&w=2074&auto=format&fit=crop"
    ],
    amenities: ["WiFi", "Private Beach", "Pool", "BBQ", "Kitchen", "AC", "Parking"],
    description: "Luxurious beachfront villa with direct access to the pristine sands of Goa's most beautiful beach.",
    host: {
      name: "Miguel Fernandes",
      joinedDate: "December 2018",
      avatar: ""
    },
    details: {
      guests: 8,
      bedrooms: 4,
      beds: 5,
      baths: 3
    },
    highlights: [
      "Direct beach access",
      "Private infinity pool",
      "Sunset views from the terrace"
    ],
    tags: ["Beachfront", "Luxury"]
  },
  {
    name: "Urban Oasis Apartment",
    type: "house",
    location: "Bangalore, Karnataka",

    price: 6500,
    rating: 4.6,
    reviews: 87,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617098474202-0d0d7f60c56a?q=80&w=2070&auto=format&fit=crop"
    ],
    amenities: ["WiFi", "Gym", "Workspace", "Kitchen", "TV", "Washer", "Parking"],
    description: "Modern apartment in the heart of Bangalore's tech hub with all amenities for the perfect work-life balance.",
    host: {
      name: "Aisha Sharma",
      joinedDate: "July 2021",
      avatar: ""
    },
    details: {
      guests: 3,
      bedrooms: 2,
      beds: 2,
      baths: 2
    },
    highlights: [
      "Walking distance to tech parks",
      "High-speed internet for remote work",
      "Rooftop garden with city views"
    ],
    tags: ["Modern", "Central"]
  },
  {
    name: "Royal Heritage Haveli",
    type: "hotel",
    location: "Jaipur, Rajasthan",

    price: 18500,
    rating: 4.9,
    reviews: 112,
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop"
    ],
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Heritage Tours", "Room Service", "Parking"],
    description: "A restored 18th-century royal retreat offering an authentic Rajasthani experience with modern luxuries.",
    host: {
      name: "Maharaja Hospitality Group",
      joinedDate: "October 2017",
      avatar: ""
    },
    details: {
      guests: 3,
      bedrooms: 1,
      beds: 1,
      baths: 1
    },
    highlights: [
      "Authentic Rajasthani architecture",
      "Royal dining experience",
      "Cultural performances every evening"
    ],
    tags: ["Heritage", "Royal"]
  }
];

export default additionalHotels;