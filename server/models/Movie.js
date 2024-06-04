import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    introduce: {
        type: String,
        required: true,
    },
});

const Movie = mongoose.model('Movie', MovieSchema);
export default Movie;
