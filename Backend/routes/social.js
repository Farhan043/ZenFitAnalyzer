const express = require('express');
const router = express.Router();
const socialController = require('../controllers/social.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.config');

// Posts routes
router.post('/posts', authMiddleware.authUser, upload.single('image'), socialController.createPost);
router.get('/posts', authMiddleware.authUser, socialController.getFeedPosts);
router.delete('/posts/:postId', authMiddleware.authUser, socialController.deletePost);
router.post('/posts/:postId/like', authMiddleware.authUser, socialController.likePost);
router.post('/posts/:postId/comment', authMiddleware.authUser, socialController.commentOnPost);

// User interaction routes
router.get('/users', authMiddleware.authUser, socialController.getAllUsers);
router.post('/follow/:userId', authMiddleware.authUser, socialController.followUser);
router.post('/unfollow/:userId', authMiddleware.authUser, socialController.unfollowUser);
router.get('/followers', authMiddleware.authUser, socialController.getFollowers);
router.get('/following', authMiddleware.authUser, socialController.getFollowing);

module.exports = router; 