import contactQueries from "../db/queries/contactQueries.js";

//get
async function getAllContacts(req, res) {
    try {
        const rows = await contactQueries.getAllContacts();
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving contacts",
            error: error.message || "Internal Server Error",
        });
    }
}

//get
async function getContactById(req, res) {
    const id = req.params.id;
    try {
        const rows = await contactQueries.getContactById(id);
        if (rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Contact not found",
                error: error.message || "Internal Server Error",
            });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving contact",
            error: error.message || "Internal Server Error",
        });
    }
}

//get
async function getContactsByCustomerId(req, res) {
    const id = req.query.customer_id;
    try {
        const rows = await contactQueries.getContactsByCustomerId(id);
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving contacts",
            error: error.message || "Internal Server Error",
        });
    }
}

//insert
async function insertContact(req, res) {
    const contact = req.body;
    try {
        const rows = await contactQueries.insertContact(contact);
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error inserting contact",
            error: error.message || "Internal Server Error",
        });
    }
}

//update
async function updateContact(req, res) {
    const id = req.params.id;
    const updates = req.body;
    try {
        const [rows] = await contactQueries.updateContact(id, updates);
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating contact",
            error: error.message || "Internal Server Error",
        });
    }
}

//delete
async function deleteContact(req, res) {
    const id = req.params.id;
    try {
        const rows= await contactQueries.deleteContact(id);
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting contact",
            error: error.message || "Internal Server Error",
        });
    }
}

export  { getAllContacts, getContactById, getContactsByCustomerId, insertContact, updateContact, deleteContact };