export function CUDMutations(type, primaryKey = 'id') {
  console.log(type);
  return {
    create: {
      type: type,
      args: {},
      resolve: () => {}
    },
    del: {
      type: type,
      args: {
        id: {
          name: primaryKey,
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (obj, {id}, source, fieldASTs) => co(function *() {
        var projections = getProjection(fieldASTs);
        console.log(id);
        return yield User.findOneAndRemove({_id: id});
      })
    },
    update: {
      type: type,
      args: {
        id: {
          name: primaryKey,
          type: new GraphQLNonNull(GraphQLString)
        },
        name: {
          name: 'name',
          type: GraphQLString
        }
      },
      resolve: (obj, {id, name}, source, fieldASTs) => co(function *() {
        var projections = getProjection(fieldASTs);
    
        yield User.update({
          _id: id
        }, {
          $set: {
            name: name
          }
        });
    
        return yield User.findById(id, projections);
      })
    }
  };
}