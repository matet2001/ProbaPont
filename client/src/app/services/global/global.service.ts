import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  readonly businessPhone = '+36 30 123 4567';
  readonly businessEmail = 'info@probapont.hu';

  readonly rooms = [
    {
      id: 1,
      name: "Aquarium",
      image: ["assets/images/rooms/Aquarium.webp", "assets/images/rooms/Aquarium2.webp"],
      size: "25 m²",
      price: "3000",
      price_additional: "FEATURES.ROOM_1.PRICE_ADD",
      features: [
        { description: "FEATURES.ROOM_1.1", icon: "ac_unit" },
        { description: "FEATURES.ROOM_1.2", icon: "waves" }
      ],
      equipment: [
        { name: "Fender Stratocaster", icon: "guitar" },
        { name: "Yamaha Stage Custom", icon: "drum" },
        { name: "Shure SM58", icon: "mic" },
        { name: "Marshall JCM800", icon: "amp" }
      ]
    },
    {
      id: 2,
      name: "Terrarium",
      image: ["assets/images/rooms/Terrarium.webp", "assets/images/rooms/Terrarium2.webp"],
      size: "30 m²",
      price: "3500",
      price_additional: "FEATURES.ROOM_2.PRICE_ADD",
      features: [
        { description: "FEATURES.ROOM_2.1", icon: "nature" },
        { description: "FEATURES.ROOM_2.2", icon: "spa" }
      ],
      equipment: [
        { name: "Gibson Les Paul", icon: "guitar" },
        { name: "Pearl Export", icon: "drum" },
        { name: "Sennheiser E835", icon: "mic" },
        { name: "Fender Twin Reverb", icon: "amp" }
      ]
    },
    {
      id: 3,
      name: "Inferno",
      image: ["assets/images/rooms/Inferno.webp", "assets/images/rooms/Inferno2.webp"],
      size: "35 m²",
      price: "4000",
      price_additional: "FEATURES.ROOM_3.PRICE_ADD",
      features: [
        { description: "FEATURES.ROOM_3.1", icon: "whatshot" },
        { description: "FEATURES.ROOM_3.2", icon: "lightbulb" }
      ],
      equipment: [
        { name: "Fender Stratocaster", icon: "guitar" },
        { name: "Pearl Export", icon: "drum" },
        { name: "Shure SM58", icon: "mic" },
        { name: "Fender Twin Reverb", icon: "amp" }
      ]
    },
    {
      id: 4,
      name: "Cosmos",
      image: ["assets/images/rooms/Cosmos.webp", "assets/images/rooms/Cosmos2.webp"],
      size: "40 m²",
      price: "4500",
      price_additional: "FEATURES.ROOM_4.PRICE_ADD",
      features: [
        { description: "FEATURES.ROOM_4.1", icon: "nightlight_round" },
        { description: "FEATURES.ROOM_4.2", icon: "science" }
      ],
      equipment: [
        { name: "Gibson Les Paul", icon: "guitar" },
        { name: "Yamaha Stage Custom", icon: "drum" },
        { name: "Sennheiser E835", icon: "mic" },
        { name: "Marshall JCM800", icon: "amp" }
      ]
    },
    {
      id: 5,
      name: "Ember",
      image: ["assets/images/rooms/Ember.webp", "assets/images/rooms/Ember2.webp"],
      size: "28 m²",
      price: "4000",
      price_additional: "FEATURES.ROOM_5.PRICE_ADD",
      features: [
        { description: "FEATURES.ROOM_5.1", icon: "chair" },
        { description: "FEATURES.ROOM_5.2", icon: "guitar" }
      ],
      equipment: [
        { name: "Fender Stratocaster", icon: "guitar" },
        { name: "Yamaha Stage Custom", icon: "drum" },
        { name: "Shure SM58", icon: "mic" },
        { name: "Fender Twin Reverb", icon: "amp" }
      ]
    },
    {
      id: 6,
      name: "Phantom",
      image: ["assets/images/rooms/Phantom.webp", "assets/images/rooms/Phantom2.webp"],
      size: "22 m²",
      price: "4000",
      price_additional: "FEATURES.ROOM_6.PRICE_ADD",
      features: [
        { description: "FEATURES.ROOM_6.1", icon: "visibility" },
        { description: "FEATURES.ROOM_6.2", icon: "contrast" }
      ],
      equipment: [
        { name: "Gibson Les Paul", icon: "guitar" },
        { name: "Pearl Export", icon: "drum" },
        { name: "Sennheiser E835", icon: "mic" },
        { name: "Marshall JCM800", icon: "amp" }
      ]
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
}

