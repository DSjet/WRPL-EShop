import express, { Request, Response } from "express";

// Create Express server
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Sample data (replace with your actual data source)
const menuItems = [
  { id: 1, name: "Burger", price: 10 },
  { id: 2, name: "Pizza", price: 12 },
  { id: 3, name: "Salad", price: 8 },
];

// GET /menu - Get all menu items
app.get("/menu", (req: Request, res: Response) => {
  res.json(menuItems);
});

// POST /menu - Create a new menu item
app.post("/menu", (req: Request, res: Response) => {
  const newItem = req.body;
  // Add validation and error handling as needed
  menuItems.push(newItem);
  res.status(201).json(newItem);
});

// GET /menu/:id - Get a specific menu item
app.get("/menu/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const menuItem = menuItems.find((item) => item.id === id);
  if (menuItem) {
    res.json(menuItem);
  } else {
    res.status(404).json({ message: "Menu item not found" });
  }
});

// DELETE /menu/:id - Delete a specific menu item
app.delete("/menu/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = menuItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    menuItems.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: "Menu item not found" });
  }
});

// PUT /menu/:id - Update a specific menu item
app.put("/menu/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = menuItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    menuItems[index] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).json({ message: "Menu item not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
