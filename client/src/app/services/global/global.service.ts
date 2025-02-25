import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  readonly businessPhone = '+36 30 123 4567';
  readonly businessEmail = 'info@probapont.hu';

  // Equipment list (shared)
  readonly equipmentList = [
    { name: "Fender Stratocaster", icon: "guitar" },
    { name: "Gibson Les Paul", icon: "guitar" },
    { name: "Yamaha Stage Custom", icon: "drum" },
    { name: "Pearl Export", icon: "drum" },
    { name: "Shure SM58", icon: "mic" },
    { name: "Sennheiser E835", icon: "mic" },
    { name: "Marshall JCM800", icon: "amp" },
    { name: "Fender Twin Reverb", icon: "amp" }
  ];

// Rentable equipment list (with prices)
  readonly rentableEquipmentList = [
    { name: "Behringer Mixer", icon: "mixer", price: 350 },
    { name: "Line 6 Helix", icon: "pedal", price: 450 },
    { name: "AKG Wireless Mic", icon: "mic", price: 300 },
    { name: "Sennheiser Headphones", icon: "headphone", price: 350 },
    { name: "Bose PA System", icon: "speaker", price: 500 },
    { name: "Roland Keyboard", icon: "synt", price: 400 },
    { name: "Nord Stage 3", icon: "synt", price: 500 },
    { name: "Yamaha HS 5 MP", icon: "speaker", price: 400 }
  ];

// Room list
  readonly rooms = [
    {
      id: 1,
      name: "Aquarium",
      image: ["assets/images/rooms/Aquarium.webp", "assets/images/rooms/Aquarium2.webp"],
      size: "25 m²",
      price: "3000",
      type: "standard",
      ac: true,
      feature: { description: "ROOM_1", icon: "waves" },
      equipmentIds: [0, 2, 4, 6],
      rentableEquipmentIds: [0, 2, 4, 6]
    },
    {
      id: 2,
      name: "Terrarium",
      image: ["assets/images/rooms/Terrarium.webp", "assets/images/rooms/Terrarium2.webp"],
      size: "30 m²",
      price: "3500",
      type: "standard",
      ac: false,
      feature: { description: "ROOM_2", icon: "nature" },
      equipmentIds: [1, 3, 5, 7],
      rentableEquipmentIds: [1, 3, 5, 7]
    },
    {
      id: 3,
      name: "Inferno",
      image: ["assets/images/rooms/Inferno.webp", "assets/images/rooms/Inferno2.webp"],
      size: "35 m²",
      price: "4000",
      type: "premium",
      ac: false,
      feature: { description: "ROOM_3", icon: "whatshot" },
      equipmentIds: [0, 3, 4, 7],
      rentableEquipmentIds: [0, 1, 4, 6]
    },
    {
      id: 4,
      name: "Cosmos",
      image: ["assets/images/rooms/Cosmos.webp", "assets/images/rooms/Cosmos2.webp"],
      size: "40 m²",
      price: "4500",
      type: "premium",
      ac: true,
      feature: { description: "ROOM_4", icon: "science" },
      equipmentIds: [1, 2, 5, 6],
      rentableEquipmentIds: [1, 2, 5, 7]
    },
    {
      id: 5,
      name: "Ember",
      image: ["assets/images/rooms/Ember.webp", "assets/images/rooms/Ember2.webp"],
      size: "28 m²",
      price: "4000",
      type: "standard",
      ac: true,
      feature: { description: "ROOM_5", icon: "chair" },
      equipmentIds: [0, 2, 4, 6],
      rentableEquipmentIds: [0, 3, 4, 7]
    },
    {
      id: 6,
      name: "Phantom",
      image: ["assets/images/rooms/Phantom.webp", "assets/images/rooms/Phantom2.webp"],
      size: "22 m²",
      price: "4000",
      type: "premium",
      ac: false,
      feature: { description: "ROOM_6", icon: "visibility" },
      equipmentIds: [1, 3, 5, 7],
      rentableEquipmentIds: [1, 2, 5, 6]
    }
  ];

  public getRandomRooms(roomAmount: number, roomId: number)  {
    const returnArray : any[] = [];
    const fromArray = [...this.rooms.filter(room => room.id !== roomId)];

    for (let i = 0; i < roomAmount; i++) {
      const chosenIndex : number = Math.floor(Math.random() * fromArray.length);
      returnArray.push(...fromArray.splice(chosenIndex, 1))
    }

    return returnArray;
  }

  public calculateLastMinutePrice(price: string): string {
    const newPrice: number = +price - 500;
    return newPrice.toString();
  }

  public calculateIndividualPracticePrice(price: string): string {
    const newPrice: number = +price - 500;
    return newPrice.toString();
  }

  public calculatePriceWithBothSales(price: string): string {
    const lastMinutePrice = this.calculateLastMinutePrice(price);

    return this.calculateIndividualPracticePrice(lastMinutePrice);
  }
}

