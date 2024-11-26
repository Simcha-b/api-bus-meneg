import { getUser } from "../db/queries/usersQueries.js";

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUser(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving user",
      error: error.message || "Internal Server Error",
    });
  }
};

export { getUserById };
