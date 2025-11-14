import UserCard from "../models/UserCards.js";

// the array of all cards
const allCards = [
  "A001-Lion",
  "A003-Bald Eagle",
  "A005-Hammerhead Shark",
  "A007-Leo, the Lion Cub",
  "A008-Blue, the Young Shark",
  "A011-Giant Panda",
  "A012-Nile Crocodile",
  "A013-Cheetah",
  "A014-Leopard",
  "A015-Black Panther",
  "A016-Snow Leopard",
  "A017-African Wild Dog",
  "A018-Side-striped Jackal",
  "A019-Asiatic Black Bear",
  "A020-Brown Bear",
  "A021-Indian Gavial",
  "A022-Sawshark",
  "A023-Goblin Shark",
  "A024-Smalltooth Sawfish",
  "A025-Peregrine Falcon",
  "A026-Great Horned Owl",
  "A027-Andean Condor",
  "A030-Bengal Tiger",
  "A031-African Elephant",
  "A032-Indian Rhinoceros",
  "A033-Electric Ray",
  "A034-Manta Ray",
  "A035-Golden Eagle",
  "A036-Anaconda",
  "A037-Red Scorpion",
  "A038-Dark Scorpion",
  "A039-Florida Bark Scorpion",
  "A040-Hippo Larry",
  "A041-Hippo Barry",
  "A042-Hippo Harry",
  "A043-Kid, the Tiger",
  "A044-Joe, the Tiger",
  "A047-Rattlesnake, the 2nd",
  "A048-Coral Snake, the 2nd",
  "S001E-Mighty Fighter",
  "S005-Leadership",
  "S009-Soul of a King",
  "S011-Burning Spirit",
  "S012-Pure Soul",
  "S018-Turnaround Blow",
  "S021-Ultimate Power",
  "S024-Hidden Strength",
  "S029-Call of the Wild",
  "S032-Hidden Power",
  "S033-Time of Miracles",
  "S034-Focus Charge",
  "S035-Lightning Speed",
  "S038-Secret Moonlight",
  "S039-King's Insignia",
  "S040-Sea Lord's Insignia",
  "S041-Power Grab",
  "S042-Flash of Light",
  "S043-Feel for Battle",
  "S044-Spirit of Gaia",
  "S045-Dream of Victory",
  "M023-Crashing Moon",
  "M024-Meteor Shower",
  "M025-Giant Meteor",
  "M026-Ice Meteor",
  "M027-Alien Egg A",
  "M028-Alien Egg D",
  "M029-Pacific Divide",
  "M030-Great Lightning",
  "M031-Super Lightning",
  "M032-Fissure",
  "M033-Earthquake",
  "M034-Magma Inferno",
  "M035-Volcanic Chain",
  "M036-Giant UFO",
  "M037-Giant Melon",
  "M038-Lava Flow",
  "M039-Alien Egg B",
  "M040-Alien Egg C",
  "M046E-Black Hole",
];

// Get all cards (with collected state)

export const getUsers = async (req, res) => {
  try {
    const userId = req.user.userId;
    // Get cards for this user
    let dbCards = await UserCard.find({ userId });

    // If user has no cards, initialize all cards for this user
    if (dbCards.length === 0) {
      const createdCards = await UserCard.insertMany(
        allCards.map((name) => ({ userId, name, collected: false }))
      );
      return res.json(createdCards);
    }

    res.json(dbCards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update card collected state

export const updateCard = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id, collected } = req.body;

    // Ensure the card belongs to the user
    const card = await UserCard.findOne({ _id: id, userId });
    if (!card) {
      return res.status(404).json({ message: "Card not found for this user" });
    }

    card.collected = collected;
    await card.save();
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
