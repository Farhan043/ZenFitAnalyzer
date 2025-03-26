const Post = require('../Models/post.model');
const User = require('../Models/user.model');

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const image = req.file ? req.file.path : null;

    let post = await Post.create({
      user: req.user._id,
      content,
      image
    });

    // Populate the user data including profile picture
    post = await Post.findById(post._id)
      .populate('user', 'name email profilePicture');

    await User.findByIdAndUpdate(req.user._id, {
      $push: { posts: post._id }
    });

    res.status(201).json({ 
      success: true, 
      post: {
        ...post.toObject(),
        user: {
          _id: post.user._id,
          name: post.user.name,
          email: post.user.email,
          profilePicture: post.user.profilePicture
        }
      }
    });
  } catch (error) {
    console.error('Error in createPost:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name email profilePicture')
      .populate('comments.user', 'name email profilePicture')
      .sort('-createdAt');

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const isLiked = post.likes.includes(req.user._id);
    
    if (isLiked) {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (userToFollow._id.toString() === currentUser._id.toString()) {
      return res.status(400).json({ error: 'You cannot follow yourself' });
    }

    const isFollowing = currentUser.following.includes(userToFollow._id);

    if (isFollowing) {
      return res.status(400).json({ error: 'You are already following this user' });
    }

    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);

    await Promise.all([currentUser.save(), userToFollow.save()]);

    res.status(200).json({ success: true, message: 'Successfully followed user' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      user: req.user._id,
      content
    });

    await post.save();

    // Fetch the updated post with populated user data
    const updatedPost = await Post.findById(post._id)
      .populate('user', 'name email profilePicture')
      .populate('comments.user', 'name email profilePicture');

    res.status(200).json({ post: updatedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sharePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const isShared = post.shares.includes(req.user._id);
    
    if (isShared) {
      post.shares = post.shares.filter(id => id.toString() !== req.user._id.toString());
    } else {
      post.shares.push(req.user._id);
    }

    await post.save();
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user._id);

    if (!userToUnfollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    currentUser.following = currentUser.following.filter(
      id => id.toString() !== userToUnfollow._id.toString()
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      id => id.toString() !== currentUser._id.toString()
    );

    await Promise.all([currentUser.save(), userToUnfollow.save()]);

    res.status(200).json({ success: true, message: 'Successfully unfollowed user' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('followers', 'name email profilePicture');
    
    res.status(200).json(user.followers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('following', 'name email profilePicture');
    
    res.status(200).json(user.following);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, {
      name: 1,
      email: 1,
      profilePicture: 1,
      followers: 1,
      following: 1
    });

    res.status(200).json({
      success: true,
      users: users.map(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        followers: user.followers,
        following: user.following
      }))
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ 
        success: false,
        error: 'Post not found' 
      });
    }

    // Check if the user is the post owner
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false,
        error: 'Unauthorized to delete this post' 
      });
    }

    await Post.findByIdAndDelete(req.params.postId);

    // Also remove the post reference from the user's posts array
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { posts: req.params.postId }
    });

    res.status(200).json({ 
      success: true, 
      message: 'Post deleted successfully' 
    });
  } catch (error) {
    console.error('Error in deletePost:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Error deleting post' 
    });
  }
};

exports.getUserPostsCount = async (req, res) => {
  try {
    // Count only the posts created by the current user
    const count = await Post.countDocuments({ user: req.user._id });
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error getting posts count:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching posts count' 
    });
  }
};

// Add other controller methods for comments, shares, and unfollow... 