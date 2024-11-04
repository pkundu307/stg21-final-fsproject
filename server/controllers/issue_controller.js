import Issue from '../models/issue_entity.js';

export const createIssue = async (req, res) => {
  try {
    const {email, phone, issue } = req.body;

    
    if (!phone || !issue) {
      return res.status(400).json({ message: "Phone and issue fields are required" });
    }

    const newIssue = new Issue({
      email,
      phone,
      issue,
      is_resolved: false
    });

    await newIssue.save();
    res.status(201).json({ message: "Issue created successfully", issue: newIssue });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the issue" });
  }
};


export const updateIssue = async (req, res) => {
  try {
    const { id } = req.params;

    const issue = Issue.findById(id);

    if(!issue){
      res.status(401).json({message:"Issue Not Found!"});
    }

    

    issue.is_resolved=true;

    await issue.save();

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the product" });
  }
};


export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json({ issues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching issues" });
  }
};



