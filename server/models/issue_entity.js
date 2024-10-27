
import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  issue: { type: String, required: true },
  is_resolved: { type: Boolean, default: false }
});

const Issue = mongoose.model('Issue', issueSchema);
export default Issue;
