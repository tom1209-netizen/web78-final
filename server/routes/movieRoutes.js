import { Router } from 'express';
import { getMovies, addMovie, updateMovie, deleteMovie, searchMovies } from '../controllers/movieController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getMovies);
router.post('/', authMiddleware, addMovie);
router.put('/:id', authMiddleware, updateMovie);
router.delete('/:id', authMiddleware, deleteMovie);
router.get('/search/:name', searchMovies);

export default router;
