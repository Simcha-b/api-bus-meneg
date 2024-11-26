import companiesQueries from "../db/queries/companiesQueries.js";
async function getCompanies(_, res) {
  try {
    const companies = await companiesQueries.getAllCompanies();
    res.json(companies);
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error retrieving companies",
        error: error.message || "Internal Server Error",
      });
  }
}

async function getCompany(req, res) {
  const companyId = req.params.id;
  try {
    const company = await companiesQueries.getCompanyById(companyId);
    if (!company) {
      res.status(404).json({
        success: false,
        message: "Company not found",
        error: error.message || "Internal Server Error",
      })
    } else {
      res.json(company);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving company",
      error: error.message || "Internal Server Error",
    })
  }
}

async function insertCompany(req, res) {
  const company = req.body;
  try {
    const newCompany = await companiesQueries.insertCompany(company);
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error inserting company",
      error: error.message || "Internal Server Error",
    })
  }
}

async function updateCompany(req, res) {
  const companyId = req.params.id;
  const updates = req.body;
  try {
    const updatedCompany = await companiesQueries.updateCompany(
      companyId,
      updates
    );
    if (!updatedCompany) {
      res.status(404).json({
        success: false,
        message: "Company not found",
        error: error.message || "Internal Server Error",
      })
    } else {
      res.json(updatedCompany);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating company",
      error: error.message || "Internal Server Error",
    })
  }
}

async function deleteCompany(req, res) {
  const companyId = req.params.id;
  try {
    const deletedCompany = await companiesQueries.deleteCompany(companyId);
    if (!deletedCompany) {
      res.status(404).json({
        success: false,
        message: "Company not found",
        error: error.message || "Internal Server Error",
      })
    } else {
      res.json(deletedCompany);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting company",
      error: error.message || "Internal Server Error",
    })
  }
}

export {
  getCompanies,
  getCompany,
  insertCompany,
  updateCompany,
  deleteCompany,
};
