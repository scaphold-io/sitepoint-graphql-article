import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';
import Actors from '../data/Actors'
import ActorType from './types/ActorType';
import Movies from '../data/Movies'
import MovieType from './types/MovieType'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      movies: {
        type: new GraphQLList(MovieType),
        resolve: _ => {
          return Movies;
        }
      },
      actors: {
        type: new GraphQLList(ActorType),
        resolve: _ => {
          return Actors;
        }
      },
      movie: {
        type: MovieType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt),
          }
        },
        resolve: (object, {id}, context, info) => {
          return Movies.find(movie => movie.id === id)
        }
      },
      actor: {
        type: ActorType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt),
          }
        },
        resolve: (object, {id}, context, info) => {
          return Actors.find(actor => actor.id === id)
        }
      },
      searchMovies: {
        type: new GraphQLList(MovieType),
        args: {
          term: {
            type: GraphQLString,
          }
        },
        resolve: (object, {term}, context, info) => {
          return Movies.filter(movie => movie.title.includes(term));
        }
      },
      searchActors: {
        type: new GraphQLList(ActorType),
        args: {
          term: {
            type: GraphQLString,
          }
        },
        resolve: (object, {term}, context, info) => {
          return Actors.filter(actor => actor.name.includes(term));
        }
      }
    }
  })
});

export default schema;