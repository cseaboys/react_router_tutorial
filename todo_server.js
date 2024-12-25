import { serve } from 'bun';

const PORT = 5000;

class Todo {
    constructor(id, title, description, completed) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }
}

const randomTitle = (index) => {
    const titles = [
        "Buy groceries", "Water the plants", "Take a walk", "Prepare dinner",
        "Read a book", "Organize desk", "Workout", "Clean the kitchen",
        "Call a friend", "Plan weekend outing", "Feed the pets", "Meditate",
        "Write in journal", "Laundry", "Respond to emails",
        "Pay bills", "Tidy up living room", "Cook breakfast", "Check on garden",
        "Schedule doctor appointment", "Order supplies", "Do a quick workout",
        "Sort mail", "Plan meals for the week", "Vacuum the house",
        "Review budget", "Take out the trash", "Prepare lunch", "Walk the dog",
    ];
    return titles[index % titles.length];
};

const randomDescription = (index) => {
    const descriptions = [
        "Make sure to get everything on the list and check for discounts.",
        "Water all indoor plants and check if they need repotting.",
        "Go for a 30-minute walk in the neighborhood or nearby park.",
        "Prepare a healthy dinner using the ingredients in the fridge.",
        "Read at least one chapter of the book currently in progress.",
        "Organize and declutter the desk to make it work-friendly.",
        "Complete a quick 15-minute workout to stay active and refreshed.",
        "Clean the kitchen countertops and put away dishes.",
        "Catch up with a friend on the phone; it’s been a while.",
        "Look up places for a weekend trip and draft a rough itinerary.",
        "Ensure the pets have enough food and water for the day.",
        "Set aside 10 minutes for quiet meditation and relaxation.",
        "Write down reflections and goals for the day in the journal.",
        "Sort and start a load of laundry, focusing on whites first.",
        "Check and respond to any urgent emails in the inbox.",
        "Review monthly expenses and pay any due bills on time.",
        "Straighten up the living room, fold blankets, and dust surfaces.",
        "Cook a balanced breakfast to kickstart the day with energy.",
        "Check the garden for weeds and look for any new blooms.",
        "Schedule the annual check-up and confirm the appointment date.",
        "Order household items needed for the week, like detergent.",
        "Do a quick home workout; focus on stretching and flexibility.",
        "Sort through the mail and discard any junk or old notices.",
        "Plan the meals for the week, focusing on healthy options.",
        "Vacuum the entire house to keep it clean and dust-free.",
        "Review last month’s expenses to stay on budget.",
        "Take out the trash and recycling before collection day.",
        "Prepare a quick lunch, using leftovers if possible.",
        "Take the dog out for a walk around the block.",
    ];
    return descriptions[index % descriptions.length];
};

let todos = [];
const seedTodos = () => {
    for (let i = 0; i < 30; i++) {
        const todo = new Todo(
            i + 1,
            randomTitle(i),
            randomDescription(i),
            Math.random() < 0.5
        );
        todos.push(todo);
    }
};
seedTodos();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const rootHandler = () => {
    return new Response(`
    <h1>Hello, World!</h1>
    <h2>Available Routes</h2>
    <ul>
      <li><a href="/todo?id=1">/todo?id=1</a> - Get a todo by ID</li>
      <li><a href="/todos">/todos</a> - Get random todos</li>
    </ul>
  `, {
        headers: { "Content-Type": "text/html" }
    });
};

const getTodoHandler = async (req) => {
    const url = new URL(req.url);
    const id = parseInt(url.searchParams.get("id"));
    if (isNaN(id) || id < 1 || id > todos.length) {
        return new Response("Invalid 'id' parameter", { status: 400 });
    }

    await delay(2000);

    const todo = todos[id - 1];
    return new Response(JSON.stringify({ todo }), {
        headers: { "Content-Type": "application/json" }
    });
};

const getTodosHandler = async () => {
    await delay(2000);

    const randomTodos = todos.filter(() => Math.random() > 0.5);
    return new Response(JSON.stringify({ todos: randomTodos }), {
        headers: { "Content-Type": "application/json" }
    });
};

// Start the server directly, without .then()
serve({
    fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === "/") {
            return rootHandler();
        }
        if (url.pathname === "/todo") {
            return getTodoHandler(req);
        }
        if (url.pathname === "/todos") {
            return getTodosHandler();
        }
        return new Response("Not found", { status: 404 });
    },
    port: PORT,
});

console.log(`Server running on http://localhost:${PORT}`);
