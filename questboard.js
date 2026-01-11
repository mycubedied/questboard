// Quest generation logic
// Quest Data Configuration
const QUEST_DATA = {
    cardio: {
        exercises: ["Run", "Walk", "Jump Rope", "Cycling", "Swimming", "Dancing", "Stair Climbing", "Hiking", "Rowing", "Elliptical"],
        units: "minutes",
        amounts: [10, 15, 20, 25, 30, 40, 45, 60]
    },
    strength: {
        exercises: ["Push-ups", "Squats", "Lunges", "Burpees", "Mountain Climbers", "Sit-ups", "Pull-ups", "Plank", "Wall Sits", "Glute Bridges"],
        units: "reps",
        amounts: [10, 15, 20, 25, 30, 40, 50],
        // Special case for time-based strength exercises
        timed: ["Plank", "Wall Sits"],
        timed_units: "seconds",
        timed_amounts: [30, 45, 60, 90, 120]
    },
    flexibility: {
        exercises: ["Yoga Flow", "Full Body Stretch", "Hamstring Stretch", "Shoulder Stretch", "Hip Opener", "Foam Rolling", "Sun Salutations"],
        units: "minutes",
        amounts: [5, 10, 15, 20, 30]
    },
    wellness: {
        exercises: ["Meditation", "Deep Breathing", "Reading", "Journaling", "Digital Detox", "Nap", "Nature Walk", "Gratitude Log"],
        units: "minutes",
        amounts: [5, 10, 15, 20, 30, 60],
        // Special case for count-based wellness
        counted: ["Drink Water", "Deep Breaths"],
        counted_units: "times",
        counted_amounts: [5, 8, 10, 12]
    }
};

const SHOP_ITEMS = {
    backgrounds: [
        { id: "bg_light_blue", name: "Light Blue", emoji: "🟦", price: 20, type: "background" },
        { id: "bg_pink", name: "Pink", emoji: "🟥", price: 20, type: "background" },
        { id: "bg_light_gray", name: "Light Gray", emoji: "⬜", price: 15, type: "background" },
        { id: "bg_blue_gray_grad", name: "Light Blue → Light Gray", emoji: "🎨", price: 30, type: "background" },
        { id: "bg_pink_gray_grad", name: "Pink → Light Gray", emoji: "🎨", price: 30, type: "background" },
        { id: "bg_blue_pink_grad", name: "Light Blue → Pink", emoji: "🎨", price: 30, type: "background" }
    ],
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

function generateRandomQuests(count = 6, filterCategory = 'all') {
    const quests = [];
    const categories = Object.keys(QUEST_DATA);

    for (let i = 0; i < count; i++) {
        // Determine category
        let category = filterCategory;
        if (filterCategory === 'all') {
            category = categories[Math.floor(Math.random() * categories.length)];
        }

        // Get data for the category
        const data = QUEST_DATA[category];
        if (!data) continue;

        let exercise, amount, units;

        // Logic to handle special subtypes (like timed strength or counted wellness)
        const roll = Math.random();

        if (category === 'strength' && roll < 0.3 && data.timed) {
            // Timed strength exercise
            exercise = data.timed[Math.floor(Math.random() * data.timed.length)];
            amount = data.timed_amounts[Math.floor(Math.random() * data.timed_amounts.length)];
            units = data.timed_units;
        } else if (category === 'wellness' && roll < 0.3 && data.counted) {
            // Counted wellness activity
            exercise = data.counted[Math.floor(Math.random() * data.counted.length)];
            amount = data.counted_amounts[Math.floor(Math.random() * data.counted_amounts.length)];
            units = data.counted_units;
        } else {
            // Standard
            exercise = data.exercises[Math.floor(Math.random() * data.exercises.length)];
            amount = data.amounts[Math.floor(Math.random() * data.amounts.length)];
            units = data.units;
        }

        // Use a string ID prefix 'daily_' and random number
        quests.push({
            quest_id: 'daily_' + Date.now() + '_' + i + '_' + Math.floor(Math.random() * 10000),
            title: `${exercise} Challenge`,
            description: `Complete ${amount} ${units} of ${exercise}`,
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
