// Approved Server-Side Data Inspection Tools for Cooperative AI

export async function fetchCoopOperationalContext(cooperativeId: string = "coop_456") {
  return {
    pendingHarvestsCount: 4,
    totalPoolableKg: 1650,
    memberFarmersCount: 24,
    activeListingsCount: 6,
    storageInventory: [
      { crop: "Benguet Highland Cabbage", qtyKg: 650, grade: "Class A", location: "La Trinidad Cold Storage", daysLeft: 7 },
      { crop: "Atok Sweet Carrots", qtyKg: 400, grade: "Class A", location: "La Trinidad Cold Storage", daysLeft: 12 },
      { crop: "Baguio Vine Tomatoes", qtyKg: 200, grade: "Class B", location: "Pico Hub", daysLeft: 3 },
    ],
    openOrders: [
      { orderId: "ORD-901", buyer: "Robinsons Supermarket", crop: "Benguet Cabbage", qtyKg: 300, status: "CONFIRMED" },
      { orderId: "ORD-902", buyer: "Metro Manila Restaurant Group", crop: "Atok Sweet Carrots", qtyKg: 150, status: "PACKING" },
    ],
  };
}
