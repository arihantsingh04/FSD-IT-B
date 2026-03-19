const router = require('express').Router();
const Idea = require('../models/Idea');
const auth = require('../middleware/authMiddleware');

// Get Ideas (Public)
router.get('/', async (req, res) => {
  try {
    const { category, status, search, sort } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'votes') sortOption = { votes: -1 };

    const ideas = await Idea.find(query).sort(sortOption);
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit Idea
router.post('/', async (req, res) => {
  const { title, description, category, tags } = req.body;
  const newIdea = new Idea({
    title,
    description,
    category,
    tags: tags ? tags.split(',').map(t => t.trim()) : []
  });
  try {
    const savedIdea = await newIdea.save();
    res.status(201).json(savedIdea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Vote (IP based)
router.post('/:id/vote', async (req, res) => {
  const { voteType } = req.body; // 'up' or 'down'
  const ip = req.ip || req.connection.remoteAddress;
  
  try {
    const idea = await Idea.findById(req.params.id);
    if (idea.voters.includes(ip)) {
      return res.status(400).json({ message: 'You have already voted.' });
    }

    idea.votes += (voteType === 'up' ? 1 : -1);
    idea.voters.push(ip);
    await idea.save();
    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Comment
router.post('/:id/comments', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    idea.comments.push({
      author: req.body.author || "Anonymous",
      body: req.body.body
    });
    await idea.save();
    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- ADMIN ROUTES ---

// Update Status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Idea
router.delete('/:id', auth, async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ message: 'Idea deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Comment
router.delete('/:ideaId/comments/:commentId', auth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.ideaId);
    idea.comments = idea.comments.filter(c => c._id.toString() !== req.params.commentId);
    await idea.save();
    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;