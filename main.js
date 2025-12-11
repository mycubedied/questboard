// Quest generation logic
const QUEST_TEMPLATES = {
    cardio: [
        { activity: "Run", units: "minutes", range: [10, 30] },
        { activity: "Walk", units: "minutes", range: [15, 45] },
        { activity: "Jump rope", units: "minutes", range: [5, 15] },
        { activity: "Cycling", units: "minutes", range: [15, 40] },
        { activity: "Swimming", units: "minutes", range: [10, 30] },
        { activity: "Dancing", units: "minutes", range: [15, 30] }
    ],
    strength: [
        { activity: "Push-ups", units: "reps", range: [10, 50] },
        { activity: "Squats", units: "reps", range: [15, 60] },
        { activity: "Lunges", units: "reps", range: [10, 40] },
        { activity: "Plank hold", units: "seconds", range: [30, 120] },
        { activity: "Wall sits", units: "seconds", range: [30, 90] },
        { activity: "Burpees", units: "reps", range: [10, 30] },
        { activity: "Mountain climbers", units: "reps", range: [20, 60] },
        { activity: "Sit-ups", units: "reps", range: [15, 50] },
        { activity: "Pull-ups", units: "reps", range: [5, 20] }
    ],
    flexibility: [
        { activity: "Yoga session", units: "minutes", range: [10, 30] },
        { activity: "Stretching routine", units: "minutes", range: [10, 20] },
        { activity: "Foam rolling", units: "minutes", range: [5, 15] }
    ],
    wellness: [
        { activity: "Drink water", units: "glasses", range: [6, 10] },
        { activity: "Meditate", units: "minutes", range: [5, 20] },
        { activity: "Sleep", units: "hours", range: [7, 9] },
        { activity: "Take deep breaths", units: "cycles", range: [5, 15] },
        { activity: "Go outside for fresh air", units: "minutes", range: [10, 30] }
    ]
};

const SHOP_ITEMS = {
    avatars: [
        { id: "avatar_1", name: "Fitness Pro", emoji: "🏋️", price: 50, type: "avatar" },
        { id: "avatar_2", name: "Yoga Master", emoji: "🧘", price: 50, type: "avatar" },
        { id: "avatar_3", name: "Runner", emoji: "🏃", price: 50, type: "avatar" },
        { id: "avatar_4", name: "Cyclist", emoji: "🚴", price: 75, type: "avatar" },
        { id: "avatar_5", name: "Swimmer", emoji: "🏊", price: 75, type: "avatar" },
        { id: "avatar_6", name: "Champion", emoji: "🏆", price: 100, type: "avatar" },
        { id: "avatar_7", name: "Martial Artist", emoji: "🥋", price: 100, type: "avatar" },
        { id: "avatar_8", name: "Boxer", emoji: "🥊", price: 100, type: "avatar" }
    ],
    cosmetics: [
        { id: "border_1", name: "Gold Border", emoji: "✨", price: 30, type: "border", color: "#ffd700" },
        { id: "border_2", name: "Silver Border", emoji: "⭐", price: 20, type: "border", color: "#c0c0c0" },
        { id: "border_3", name: "Bronze Border", emoji: "🔶", price: 10, type: "border", color: "#cd7f32" },
        { id: "border_4", name: "Rainbow Border", emoji: "🌈", price: 150, type: "border", color: "linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b00ff)" },
        { id: "title_1", name: "Beginner", emoji: "🌱", price: 5, type: "title" },
        { id: "title_2", name: "Warrior", emoji: "⚔️", price: 50, type: "title" },
        { id: "title_3", name: "Legend", emoji: "👑", price: 100, type: "title" },
        { id: "title_4", name: "Master", emoji: "🎖️", price: 200, type: "title" }
    ],
    vip_crates: [
        { id: "bronze_crate", name: "Bronze VIP Crate", emoji: "📦", price: 100, type: "crate", vip_required: 1, description: "Basic VIP crate with common rewards" },
        { id: "silver_crate", name: "Silver VIP Crate", emoji: "🎁", price: 250, type: "crate", vip_required: 2, description: "Advanced VIP crate with uncommon and rare rewards" },
        { id: "gold_crate", name: "Gold VIP Crate", emoji: "🏆", price: 500, type: "crate", vip_required: 3, description: "Premium VIP crate with epic and legendary rewards" },
        { id: "platinum_crate", name: "Platinum VIP Crate", emoji: "💫", price: 1000, type: "crate", vip_required: 5, description: "Ultimate VIP crate with guaranteed legendary rewards" }
    ]
};

const VIP_CRATES = {
    bronze_crate: {
        rewards: [
            { item: "Common Avatar", type: "avatar", emoji: "👤", probability: 0.50, rarity: "common" },
            { item: "Basic Border", type: "border", emoji: "⬜", probability: 0.30, rarity: "common" },
            { item: "50 Bonus Points", type: "points", emoji: "💰", value: 50, probability: 0.15, rarity: "uncommon" },
            { item: "Epic Title", type: "title", emoji: "🎯", probability: 0.05, rarity: "rare" }
        ]
    },
    silver_crate: {
        rewards: [
            { item: "Rare Avatar", type: "avatar", emoji: "🦸", probability: 0.40, rarity: "uncommon" },
            { item: "Premium Border", type: "border", emoji: "🔷", probability: 0.30, rarity: "uncommon" },
            { item: "150 Bonus Points", type: "points", emoji: "💎", value: 150, probability: 0.20, rarity: "rare" },
            { item: "Legendary Title", type: "title", emoji: "👑", probability: 0.08, rarity: "epic" },
            { item: "Mystery Reward", type: "special", emoji: "❓", probability: 0.02, rarity: "legendary" }
        ]
    },
    gold_crate: {
        rewards: [
            { item: "Epic Avatar", type: "avatar", emoji: "🌟", probability: 0.35, rarity: "rare" },
            { item: "Diamond Border", type: "border", emoji: "💠", probability: 0.25, rarity: "epic" },
            { item: "300 Bonus Points", type: "points", emoji: "🔥", value: 300, probability: 0.20, rarity: "epic" },
            { item: "Ultimate Title", type: "title", emoji: "⚡", probability: 0.15, rarity: "epic" },
            { item: "Exclusive Avatar Pack", type: "avatar_pack", emoji: "🎭", probability: 0.04, rarity: "legendary" },
            { item: "Jackpot 1000 Points", type: "points", emoji: "💸", value: 1000, probability: 0.01, rarity: "legendary" }
        ]
    },
    platinum_crate: {
        rewards: [
            { item: "Legendary Avatar", type: "avatar", emoji: "🔱", probability: 0.30, rarity: "legendary" },
            { item: "Cosmic Border", type: "border", emoji: "🌌", probability: 0.25, rarity: "legendary" },
            { item: "500 Bonus Points", type: "points", emoji: "💵", value: 500, probability: 0.20, rarity: "legendary" },
            { item: "Divine Title", type: "title", emoji: "✨", probability: 0.15, rarity: "legendary" },
            { item: "Ultimate Pack", type: "ultimate_pack", emoji: "🎪", probability: 0.08, rarity: "mythic" },
            { item: "MEGA JACKPOT 5000 Points", type: "points", emoji: "🏅", value: 5000, probability: 0.02, rarity: "mythic" }
        ]
    }
};

function generateRandomQuests(count = 6) {
    const quests = [];
    const categories = Object.keys(QUEST_TEMPLATES);

    for (let i = 0; i < count; i++) {
        const category = categories[i % categories.length];
        const templates = QUEST_TEMPLATES[category];
        const template = templates[Math.floor(Math.random() * templates.length)];
        const amount = Math.floor(Math.random() * (template.range[1] - template.range[0] + 1)) + template.range[0];

        quests.push({
            quest_id: i + 1,
            title: `${template.activity} Challenge`,
            description: `Complete ${amount} ${template.units} of ${template.activity.toLowerCase()}`,
            category: category,
            status: "active"
        });
    }

    return quests;
}

function openCrate(crateId, userVipLevel) {
    if (!VIP_CRATES[crateId]) {
        return { error: "Invalid crate ID" };
    }

    const crate = VIP_CRATES[crateId];
    const rewards = crate.rewards;
    const randomValue = Math.random();
    let cumulativeProbability = 0.0;

    for (const reward of rewards) {
        cumulativeProbability += reward.probability;
        if (randomValue <= cumulativeProbability) {
            return {
                success: true,
                reward: reward,
                message: `You received: ${reward.emoji} ${reward.item}!`
            };
        }
    }

    return {
        success: true,
        reward: rewards[rewards.length - 1],
        message: `You received: ${rewards[rewards.length - 1].emoji} ${rewards[rewards.length - 1].item}!`
    };
}

window.questBoardAPI = {
    generateRandomQuests,
    getShopItems: () => SHOP_ITEMS,
    openCrate
};
