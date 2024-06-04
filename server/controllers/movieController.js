import Movie from '../models/Movie.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dldqxzpl4',
    api_key: '671531253519199',
    api_secret: '8w4vXUgg-tPDU4wSSkOuMNiR-N0'
});

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
  const { ID, name, time, year, introduce } = req.body;

  try {
    let movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }

    if (req.file) {
      const dataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      const fileName = req.file.originalname.split('.')[0];

      try {
        const result = await cloudinary.uploader.upload(dataUrl, {
          public_id: fileName,
          resource_type: 'auto',
        });

        if (result) {
          movie.image = result.secure_url; 
        }
      } catch (err) {
        console.error('Cloudinary upload error:', err);
        return res.status(500).json({ msg: 'Error uploading image' });
      }
    }

    movie.ID = ID || movie.ID;
    movie.name = name || movie.name;
    movie.time = time || movie.time;
    movie.year = year || movie.year;
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

export const sortedMovies = async (req, res) => {
  const { sortOrder } = req.query; 

  try {
    let sortQuery = {};
    if (sortOrder) {
      sortQuery = { year: sortOrder === 'asc' ? 1 : -1 }; 
    } else {
      sortQuery = { year: 1 }; 
    }

    const movies = await Movie.find().sort(sortQuery);
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
