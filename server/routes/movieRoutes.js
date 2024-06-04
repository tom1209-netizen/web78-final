import { Router } from 'express';
import { getMovies, addMovie, updateMovie, deleteMovie, searchMovies, sortedMovies } from '../controllers/movieController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import multer from 'multer';

// Define multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.get('/', getMovies);
router.post('/', authMiddleware, addMovie);
router.put('/:id', upload.single('image'), updateMovie);
router.delete('/:id', authMiddleware, deleteMovie);
router.get('/search/:name', searchMovies);
router.get('/sort/:sortOrder', sortedMovies);

export default router;
