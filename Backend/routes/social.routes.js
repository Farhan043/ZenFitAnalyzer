const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const socialController = require('../controllers/social.controller');
const upload = require('../middlewares/multer.config');

// Post routes
router.post('/posts', authMiddleware.authUser, upload.single('image'), socialController.createPost);
router.get('/posts', authMiddleware.authUser, socialController.getFeedPosts);
router.post('/posts/:postId/like', authMiddleware.authUser, socialController.likePost);
router.post('/posts/:postId/comment', authMiddleware.authUser, socialController.commentOnPost);
router.post('/posts/:postId/share', authMiddleware.authUser, socialController.sharePost);
router.delete('/posts/:postId', authMiddleware.authUser, socialController.deletePost);

// Follow routes
router.post('/follow/:userId', authMiddleware.authUser, socialController.followUser);
router.post('/unfollow/:userId', authMiddleware.authUser, socialController.unfollowUser);
router.get('/followers', authMiddleware.authUser, socialController.getFollowers);
router.get('/following', authMiddleware.authUser, socialController.getFollowing);

// Add this new route
router.get('/users', authMiddleware.authUser, socialController.getAllUsers);

// Add this new route
router.get('/posts/count', authMiddleware.authUser, socialController.getUserPostsCount);

module.exports = router; 