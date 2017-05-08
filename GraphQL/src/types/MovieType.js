import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat
} from 'graphql';
import Actors from '../../data/Actors'
import Movies from '../../data/Movies'
import ActorType from './ActorType';

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'A blockbuster movie',
  fields:() => ({
    id: {
      type: GraphQLInt,
      description: "The movie id"
    },
    title: {
      type: GraphQLString,
      description: "The movie's title"
    },
    image: {
      type: GraphQLString,
      description: "The movie's cover image url"
    },
    release_year: {
      type: GraphQLInt,
      description: "The movie release date"
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      description: "Movie tags"
    },
    rating: {
      type: GraphQLFloat,
      description: "The movie rating"
    },
    actors: {
      type: new GraphQLList(ActorType),
      resolve: (movie) => {
        const movieActors = movie.actors.map(actorId => Actors.find(o => o.id === actorId))
        return movieActors;
      }
    }
  }),
});

export default MovieType;
