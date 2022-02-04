
// represents database connection
let list = [
    { id: 0, isChecked: false }, 
    {id: 1, isChecked: true},
];

export const resolvers = {
    Query: {
      list: () => list,
    },
    Mutation: {
        updateList: (_, { newList }) => { 
            if (newList){
                list = newList;
                
                return list;
            }
        },
    }
};