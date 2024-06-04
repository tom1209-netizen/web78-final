import Movie from '../models/Movie.js';

export const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const addMovie = async (req, res) => {
    const { ID, name, time, year, image, introduce } = req.body;

    try {
        let movie = new Movie({
            ID,
            name,
            time,
            year,
            image,
            introduce,
        });

        await movie.save();
        res.json(movie);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const updateMovie = async (req, res) => {
    const { ID, name, time, year, image, introduce } = req.body;

    try {
        let movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ msg: 'Movie not found' });
        }

        movie.ID = ID || movie.ID;
        movie.name = name || movie.name;
        movie.time = time || movie.time;
        movie.year = year || movie.year;
        movie.image = image || movie.image;
        movie.introduce = introduce || movie.introduce;

        await movie.save();
        res.json(movie);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const deleteMovie = async (req, res) => {
    try {
        let movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ msg: 'Movie not found' });
        }

        await movie.remove();
        res.json({ msg: 'Movie removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const searchMovies = async (req, res) => {
    try {
        const movies = await Movie.find({ name: { $regex: req.params.name, $options: 'i' } });
        res.json(movies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
